import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "jwt-refresh-token-rotation",
  title: "JWT + Refresh Token Rotation: A Sane Pattern for Modern Auth",
  description:
    "Most JWT auth implementations are insecure, accidentally stateless when they should be stateful, or both. Here's the rotation pattern that actually works for production web apps.",
  date: "2025-10-30",
  updated: "2026-03-15",
  tags: ["Auth", "JWT", "Security", "Backend"],
  category: "Backend Systems",
  readingTime: 9,
  tldr:
    "Short-lived JWT access tokens (15 min) + opaque refresh tokens stored server-side, rotated on every use, with refresh-reuse detection that revokes the entire family. This is the pattern.",
  faq: [
    {
      q: "Why not just use long-lived JWTs and skip refresh tokens?",
      a: "Because you can't revoke a JWT before it expires without maintaining a blacklist — which defeats the point of being 'stateless.' Long-lived JWTs in a stolen-laptop scenario stay valid until they expire, which is unacceptable for most products.",
    },
    {
      q: "Should refresh tokens be JWTs too?",
      a: "No. Refresh tokens should be opaque random strings, stored server-side, looked up on each refresh. They need revocation, expiry tracking, and family identification — all things that work poorly with stateless JWTs.",
    },
    {
      q: "What's refresh token reuse detection?",
      a: "If a refresh token is used twice, that means someone replayed an old one — either a buggy client or a stolen token. The defense is to revoke the entire token 'family' (all descendants of the original login) when reuse is detected, forcing all sessions for that user to re-authenticate.",
    },
  ],
  related: [
    "rbac-multi-tenant-postgres",
    "idempotency-keys-llm-apis",
    "backpressure-streaming-apis",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        JWT auth is one of those topics where the most popular tutorial is
        actively dangerous and the actually-correct pattern is buried in
        OAuth 2.0 RFC supplements that nobody reads. The result is that
        most production web apps have JWT implementations with at least
        one serious flaw: tokens that can&rsquo;t be revoked, refresh
        tokens that never rotate, or stateless tokens carrying long-lived
        sessions.
      </p>
      <p>
        Here is the pattern that actually works. It&rsquo;s what every
        mature auth library does under the hood and what you should
        implement if you&rsquo;re rolling your own.
      </p>

      <h2 id="two-tokens">Two tokens, two purposes</h2>
      <p>
        Modern web auth uses two tokens with different security properties:
      </p>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Access token</th>
            <th>Refresh token</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Format</td>
            <td>JWT (signed, self-contained)</td>
            <td>Opaque (random bytes, server-side lookup)</td>
          </tr>
          <tr>
            <td>Lifetime</td>
            <td>5&ndash;15 minutes</td>
            <td>Days to weeks (rotated on use)</td>
          </tr>
          <tr>
            <td>Used for</td>
            <td>Every API request</td>
            <td>Getting a new access token</td>
          </tr>
          <tr>
            <td>Stored where</td>
            <td>Memory (or in-memory storage)</td>
            <td>HttpOnly + Secure cookie</td>
          </tr>
          <tr>
            <td>Revocable?</td>
            <td>No (waits for expiry)</td>
            <td>Yes (delete from DB)</td>
          </tr>
        </tbody>
      </table>
      <p>
        The short access token lifetime is the whole point. Even if it
        leaks, it expires in 15 minutes. Revocation comes from the
        refresh token side, which is stateful and revocable.
      </p>

      <h2 id="rotation">Rotation: the key idea</h2>
      <p>
        Every time a refresh token is used to get a new access token, the
        refresh token itself is replaced with a new one. The old refresh
        token is marked as used. The client stores the new refresh token
        going forward.
      </p>
      <p>
        Why this matters: a stolen refresh token has a single chance to
        be exploited before the legitimate client rotates it. After
        rotation, the stolen token is dead.
      </p>
      <pre>
        <code>{`-- refresh_tokens table
CREATE TABLE refresh_tokens (
  id           UUID PRIMARY KEY,
  user_id      UUID NOT NULL,
  family_id    UUID NOT NULL,  -- groups all descendants of one login
  token_hash   TEXT NOT NULL,  -- bcrypt or argon2 of the random token
  parent_id    UUID,           -- previous token in the chain
  used         BOOLEAN DEFAULT FALSE,
  revoked      BOOLEAN DEFAULT FALSE,
  expires_at   TIMESTAMPTZ NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX ON refresh_tokens (token_hash);
CREATE INDEX ON refresh_tokens (family_id);`}</code>
      </pre>

      <h2 id="reuse-detection">Refresh reuse detection</h2>
      <p>
        Here&rsquo;s where the design gets clever. If a refresh token is
        used twice&mdash;the first time legitimately, the second time by
        somebody else replaying it&mdash;you have evidence that something
        is wrong. Either:
      </p>
      <ul>
        <li>A buggy client that retried after success (a bug, but harmless)</li>
        <li>An attacker replaying a stolen token (an attack)</li>
      </ul>
      <p>
        You can&rsquo;t tell which from the request. The safe default is
        to assume the worst: revoke the entire token family. Every
        descendant of that original login is now invalid. The user gets
        forced re-authentication, and the attacker is out.
      </p>

      <Callout label="What 'family' means">
        A token family is the chain of refresh tokens descended from a
        single login event. User logs in &rarr; refresh token A1. They
        refresh &rarr; A2 (parent A1). They refresh &rarr; A3 (parent A2).
        A1, A2, A3 are all in the same family. If anyone tries to reuse
        A1 after it&rsquo;s been replaced, all three are revoked.
      </Callout>

      <h2 id="implementation">The refresh endpoint, in pseudocode</h2>
      <pre>
        <code>{`POST /auth/refresh
Body: { refresh_token: "rt_abc123..." }

# 1. Look up the token by hash
row = db.query(\`
  SELECT id, user_id, family_id, used, revoked, expires_at
  FROM refresh_tokens
  WHERE token_hash = $1
\`, hash(refresh_token))

if not row: return 401 "invalid"
if row.expires_at < now(): return 401 "expired"
if row.revoked: return 401 "revoked"

# 2. The critical reuse check
if row.used:
  # This token was already used. Someone is replaying.
  db.execute(\`
    UPDATE refresh_tokens SET revoked = true
    WHERE family_id = $1
  \`, row.family_id)
  return 401 "reuse_detected"

# 3. Happy path: mint new tokens
db.transaction(() => {
  db.execute(\`UPDATE refresh_tokens SET used = true WHERE id = $1\`, row.id)
  new_refresh = generate_random_token()
  db.execute(\`
    INSERT INTO refresh_tokens (id, user_id, family_id, token_hash, parent_id, expires_at)
    VALUES ($1, $2, $3, $4, $5, $6)
  \`, ...)
})

access_token = sign_jwt({ user_id, exp: now() + 15min })

# 4. Return new access + refresh in HttpOnly cookie
return { access_token } + Set-Cookie: refresh=...; HttpOnly; Secure; SameSite=Strict`}</code>
      </pre>

      <h2 id="storage-rules">Storage rules nobody told you</h2>
      <ul>
        <li>
          <strong>Refresh token in HttpOnly cookie.</strong> Not in
          localStorage. Not in a regular cookie. HttpOnly so JavaScript
          can&rsquo;t read it; Secure so it&rsquo;s HTTPS-only; SameSite
          to limit CSRF surface.
        </li>
        <li>
          <strong>Access token in memory.</strong> Not in localStorage
          either&mdash;XSS would steal it. Keep it in a JS variable in
          your app state. Yes, this means it&rsquo;s lost on tab refresh;
          your refresh flow handles that case by silently fetching a new
          one from the cookie.
        </li>
        <li>
          <strong>Hash refresh tokens at rest.</strong> Bcrypt or argon2.
          If your DB leaks, the tokens shouldn&rsquo;t be usable.
        </li>
        <li>
          <strong>Rotate signing keys.</strong> Your JWT signing key
          should rotate every few months. Support multiple active keys
          (key ID in the JWT header) so you can rotate without
          invalidating outstanding tokens.
        </li>
      </ul>

      <h2 id="claims">JWT claims to include</h2>
      <pre>
        <code>{`{
  "sub": "user-uuid",       // who
  "iat": 1714502400,        // issued at
  "exp": 1714503300,        // expires (15 min)
  "iss": "https://api.example.com",  // who issued it
  "aud": "web-client",      // intended audience
  "jti": "token-uuid",      // unique token id (for blacklist if needed)
  "scope": "read:profile write:posts"
}`}</code>
      </pre>
      <p>
        Don&rsquo;t put the user&rsquo;s full profile in the JWT. Put
        the user ID and look up the rest. JWTs grow stale; the database
        doesn&rsquo;t.
      </p>

      <h2 id="closing">Closing: complexity earned</h2>
      <p>
        This pattern feels like a lot of moving parts compared to
        &ldquo;just check a JWT.&rdquo; It is. But every piece is doing
        real work: short access tokens limit the blast radius of a leak,
        rotation kills replay attacks, reuse detection catches active
        compromise, server-side refresh storage enables revocation. The
        simple version skips all of these and leaves you with security
        debt that compounds.
      </p>
      <p>
        Most auth libraries (Auth0, Clerk, NextAuth, Supabase Auth)
        implement this for you. The reason to know the pattern is
        twofold: you can evaluate whether your library is doing it
        right, and when you have to roll your own&mdash;and you will, at
        least once&mdash;you can do it right.
      </p>
    </>
  )
}
