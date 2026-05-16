import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "notebook-to-production-ml",
  title: "From Notebook to Production: ML Model Serving on a Budget",
  description:
    "Your model works in a notebook. Production is a different language. Here's a budget-conscious path from .ipynb to a service that serves real traffic — without buying an MLOps platform.",
  date: "2025-08-18",
  updated: "2026-02-04",
  tags: ["MLOps", "Production", "Model Serving", "ML Systems"],
  category: "ML Systems",
  readingTime: 8,
  tldr:
    "Wrap the model in FastAPI, containerize, add health checks, log inputs and outputs, deploy behind a CDN. That's 80% of what an MLOps platform sells you for $30k/year. Skip the platform until you have model count or compliance requirements that justify it.",
  faq: [
    {
      q: "Do I need Kubernetes to serve an ML model?",
      a: "No. A single VM running a containerized FastAPI service with the model loaded in memory handles thousands of requests per second for small models. Reach for orchestration when you actually need it — multiple models, autoscaling under variable load, or zero-downtime deploys.",
    },
    {
      q: "Should I use ONNX / TorchScript / TensorRT?",
      a: "Worth the time when latency or throughput is the bottleneck. Pure PyTorch inference is convenient but 2-5x slower than ONNX Runtime for the same model on the same hardware. Profile first; convert when the numbers justify it.",
    },
    {
      q: "When should I move to a managed inference service?",
      a: "When operational burden exceeds engineering value. If you're running 1-3 models and your team is comfortable with Docker, self-host. If you're running 20 models or need things like blue/green canary deploys out of the box, managed pays for itself.",
    },
  ],
  related: [
    "observability-ai-pipelines",
    "cost-optimizing-llm-inference",
    "edge-vs-origin-genai",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        The notebook ran. The model predicted things correctly. Now
        somebody wants it in the product. This is the gap where most ML
        projects die a quiet death&mdash;not because the model was bad
        but because nobody owned the path from <code>.ipynb</code> to a
        running service.
      </p>
      <p>
        You don&rsquo;t need an MLOps platform to bridge that gap. You
        need about a day of focused engineering and the discipline to
        skip the bells you don&rsquo;t need.
      </p>

      <h2 id="step-1-wrap">Step 1: wrap the model in a service</h2>
      <p>
        FastAPI for Python. Define the request and response with
        Pydantic, validate everything, load the model once on startup,
        keep it in memory for the lifetime of the process.
      </p>
      <pre>
        <code>{`from fastapi import FastAPI
from pydantic import BaseModel, Field
import joblib

app = FastAPI()
model = joblib.load("model.pkl")  # loaded once

class PredictIn(BaseModel):
    features: list[float] = Field(..., min_items=10, max_items=10)

class PredictOut(BaseModel):
    label: str
    confidence: float

@app.post("/predict", response_model=PredictOut)
def predict(req: PredictIn):
    proba = model.predict_proba([req.features])[0]
    idx = proba.argmax()
    return PredictOut(label=str(idx), confidence=float(proba[idx]))

@app.get("/healthz")
def healthz():
    return {"status": "ok"}`}</code>
      </pre>

      <h2 id="step-2-container">Step 2: containerize</h2>
      <p>Dockerfile. Pin versions. Multi-stage if you care about image size.</p>
      <pre>
        <code>{`FROM python:3.11-slim AS base
WORKDIR /app
RUN pip install --no-cache-dir uv
COPY requirements.txt .
RUN uv pip install --system -r requirements.txt
COPY app/ ./app
COPY model.pkl .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]`}</code>
      </pre>

      <Callout label="Workers, not threads">
        Python ML libraries hold the GIL during inference, so threads
        don&rsquo;t help. <code>--workers N</code> launches N processes
        sharing the model file (memory-mapped if your library supports
        it). Match workers to CPU count, minus one for the OS.
      </Callout>

      <h2 id="step-3-logging">Step 3: logging that lets you debug</h2>
      <p>
        Every prediction should emit a structured log line: input
        features (or a hash if sensitive), predicted label, confidence,
        model version, latency, request ID. Without this you can&rsquo;t
        investigate any model behavior question after deployment.
      </p>
      <pre>
        <code>{`import structlog
logger = structlog.get_logger()

@app.post("/predict")
def predict(req: PredictIn):
    start = time.perf_counter()
    proba = model.predict_proba([req.features])[0]
    idx = int(proba.argmax())
    elapsed = (time.perf_counter() - start) * 1000

    logger.info("predict",
        model_version=MODEL_VERSION,
        label=str(idx),
        confidence=float(proba[idx]),
        latency_ms=round(elapsed, 2),
        input_shape=len(req.features))

    return PredictOut(label=str(idx), confidence=float(proba[idx]))`}</code>
      </pre>

      <h2 id="step-4-deploy">Step 4: deploy somewhere boring</h2>
      <p>
        A single VM (DigitalOcean, Hetzner, AWS Lightsail) running your
        container behind nginx or Caddy with TLS. $5&ndash;$20 a month.
        Throughput in the thousands of requests per second for small
        models. Operational burden: low.
      </p>
      <p>
        If you need redundancy: two VMs in different zones, a managed
        load balancer in front, same image, deploy by rolling. Still
        nowhere near Kubernetes complexity.
      </p>
      <p>
        For serverless options: Cloud Run, Lambda with container support,
        Fly.io. Pay-per-request, auto-scales, costs almost nothing at low
        traffic. Watch out for cold starts on large models.
      </p>

      <h2 id="step-5-versioning">Step 5: model versioning</h2>
      <p>
        The model file is a build artifact. Treat it like code:
      </p>
      <ul>
        <li>
          Store in a versioned bucket (S3, R2, GCS) with immutable paths:
          <code>s3://models/sentiment/v2025-08-18/model.pkl</code>
        </li>
        <li>
          Container references a specific version via environment
          variable.
        </li>
        <li>
          To roll out a new model: build a new container with the new
          version env var, deploy. Roll back = redeploy the previous
          image.
        </li>
        <li>
          Log <code>MODEL_VERSION</code> on every request so you can
          attribute behavior to a specific model build.
        </li>
      </ul>

      <h2 id="step-6-monitoring">Step 6: drift detection (cheap version)</h2>
      <p>
        You don&rsquo;t need an MLOps platform for drift detection. You
        need:
      </p>
      <ul>
        <li>
          Distribution of confidence scores over time. Sudden shifts mean
          input distribution changed.
        </li>
        <li>
          Distribution of predicted labels over time. A model that
          suddenly predicts class 3 for 80% of inputs has a problem.
        </li>
        <li>
          Latency percentiles. If they regress on a new model, you have a
          performance bug.
        </li>
      </ul>
      <p>
        Send these to whatever metrics system you already run (Prometheus,
        CloudWatch, Datadog). Dashboards are dashboards.
      </p>

      <h2 id="when-to-graduate">When to graduate</h2>
      <p>
        You&rsquo;ve outgrown this when:
      </p>
      <ul>
        <li>
          You&rsquo;re serving 5+ models and the operational overhead is
          significant.
        </li>
        <li>
          You need A/B testing of models with statistical rigor (not just
          two endpoints).
        </li>
        <li>
          Compliance requires audit trails for every prediction with
          guaranteed retention.
        </li>
        <li>
          Training and serving need to share feature pipelines without
          drift.
        </li>
      </ul>
      <p>
        That&rsquo;s when SageMaker / Vertex AI / managed Modal / BentoML
        pays for itself. Until then, this pattern handles real models in
        real production at a fraction of the cost. The path from notebook
        to served model is shorter than the marketing makes it sound.
      </p>
    </>
  )
}
