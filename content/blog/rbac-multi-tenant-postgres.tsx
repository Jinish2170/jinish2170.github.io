import { Callout } from "@/components/blog/prose"
import type { BlogMeta } from "./types"

export const meta: BlogMeta = {
  slug: "rbac-multi-tenant-postgres",
  title: "RBAC for Multi-Tenant Apps: A Postgres-Native Approach",
  description:
    "Most RBAC implementations are either too simple (one role column) or accidentally a permission language. A Postgres-native pattern that scales without becoming an internal product.",
  date: "2025-09-22",
  updated: "2026-02-25",
  tags: ["RBAC", "Authorization", "Postgres", "Multi-tenant", "Backend"],
  category: "Backend Systems",
  readingTime: 9,
  tldr:
    "Roles + permissions + role assignments, plus row-level security for tenant isolation. That's the whole pattern. Resist the urge to build a permission DSL until you have evidence you need one.",
  faq: [
    {
      q: "When should I use row-level security vs filtering in application code?",
      a: "Use RLS for the safety net — even if your application code forgets a WHERE clause, RLS prevents cross-tenant data leakage. Don't rely solely on RLS for complex authorization decisions; combine with application-level checks. Defense in depth.",
    },
    {
      q: "Is one role column enough or do I need a separate role system?",
      a: "One column works until you need: per-resource permissions, hierarchical roles, multiple roles per user, or admin override patterns. Most apps need the separate role system within their first year — start there.",
    },
    {
      q: "Should I look at policy engines like OPA / Cedar?",
      a: "Only if you have multiple services that need consistent authorization decisions, or your permission rules are getting genuinely complex (cross-resource conditions, time-based access). For a single web app, native DB RBAC is simpler and faster.",
    },
  ],
  related: [
    "jwt-refresh-token-rotation",
    "idempotency-keys-llm-apis",
    "observability-ai-pipelines",
  ],
}

export default function Post() {
  return (
    <>
      <p>
        Multi-tenant authorization is one of those problems that looks
        simple in the first sprint and recursive after six months. The
        team adds &ldquo;just one more&rdquo; flag to the user table,
        then a few more, then realizes they&rsquo;ve built an
        ad-hoc permission language and can&rsquo;t reason about it.
      </p>
      <p>
        The pattern I keep coming back to: roles, permissions, role
        assignments, and Postgres row-level security for tenant
        isolation. Four tables, well-scoped, no DSL. It covers 95% of
        what real products need and leaves the door open for OPA or
        Cedar when you have evidence you need more.
      </p>

      <h2 id="schema">The schema</h2>
      <pre>
        <code>{`-- Tenants (organizations, workspaces, whatever you call them)
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Users (global, not per-tenant)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Roles defined per-tenant
CREATE TABLE roles (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,           -- 'admin', 'editor', 'viewer'
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tenant_id, name)
);

-- Permissions are atoms: 'project:create', 'invoice:read', etc.
CREATE TABLE permissions (
  id UUID PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT
);

-- What permissions does each role have?
CREATE TABLE role_permissions (
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- Which user is which role within which tenant?
CREATE TABLE user_tenant_roles (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, tenant_id, role_id)
);`}</code>
      </pre>
      <p>Four observations:</p>
      <ul>
        <li>
          Permissions are global atoms with stable names. Use a naming
          convention: <code>{`{resource}:{verb}`}</code>. Searchable,
          documentable, scriptable.
        </li>
        <li>
          Roles are per-tenant. Each tenant can have an &ldquo;admin&rdquo;
          that means different things. Don&rsquo;t share role IDs across
          tenants.
        </li>
        <li>
          A user can have multiple roles in the same tenant. This sounds
          unnecessary until somebody asks for it; the cost of supporting
          it from day one is zero, the cost of retrofitting is high.
        </li>
        <li>
          A user belongs to multiple tenants by having rows in{" "}
          <code>user_tenant_roles</code> with different{" "}
          <code>tenant_id</code>s.
        </li>
      </ul>

      <h2 id="permission-check">The permission check</h2>
      <p>
        The single most important query in the system. It answers:
        &ldquo;does user X have permission Y in tenant Z?&rdquo;
      </p>
      <pre>
        <code>{`-- Returns true if the user has the permission via any of their roles
SELECT EXISTS (
  SELECT 1
  FROM user_tenant_roles utr
  JOIN role_permissions rp ON rp.role_id = utr.role_id
  JOIN permissions p ON p.id = rp.permission_id
  WHERE utr.user_id = $1
    AND utr.tenant_id = $2
    AND p.name = $3
);`}</code>
      </pre>
      <p>
        Cache the result in your request context. You do not want to
        re-run this on every line of code. Once per request is enough.
      </p>

      <h2 id="row-level-security">Row-level security for tenant isolation</h2>
      <p>
        Application-level filtering (<code>WHERE tenant_id = ?</code>) is
        the primary defense. RLS is the safety net for when somebody
        forgets the filter, which they will, at least once.
      </p>
      <pre>
        <code>{`-- Set the tenant context for this database session
SET LOCAL app.current_tenant_id = 'tenant-uuid';

-- Enable RLS on tables that hold tenant-scoped data
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: rows are visible only when tenant_id matches the session
CREATE POLICY tenant_isolation ON projects
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Even a query like SELECT * FROM projects (no WHERE) now scopes correctly`}</code>
      </pre>
      <p>
        Set the session variable on every request inside a transaction.
        Use <code>SET LOCAL</code>, not <code>SET</code>, so it
        doesn&rsquo;t leak to the next request from the same connection
        in your pool.
      </p>

      <Callout label="Bypassing RLS for admin operations">
        Cross-tenant admin operations (your internal support tool,
        analytics jobs) need to bypass RLS. Either use a separate
        Postgres role with <code>BYPASSRLS</code> attribute, or use{" "}
        <code>SET LOCAL ROLE</code> within a transaction. Don&rsquo;t
        disable RLS in your normal application path.
      </Callout>

      <h2 id="seeding-roles">Seeding default roles</h2>
      <p>
        Every tenant gets a default set of roles on creation. Don&rsquo;t
        make tenants design their own role model from scratch&mdash;most
        of them want the same three roles.
      </p>
      <pre>
        <code>{`async function createTenant(name: string, ownerUserId: string) {
  return db.transaction(async (tx) => {
    const tenant = await tx.tenants.create({ name })

    // Default roles
    const [adminRole, editorRole, viewerRole] = await tx.roles.createMany([
      { tenant_id: tenant.id, name: 'admin' },
      { tenant_id: tenant.id, name: 'editor' },
      { tenant_id: tenant.id, name: 'viewer' },
    ])

    // Assign default permissions to each role
    await tx.role_permissions.createMany([
      // admin gets everything
      ...allPermissions.map(p => ({ role_id: adminRole.id, permission_id: p.id })),
      // editor gets read + write
      ...readWritePermissions.map(p => ({ role_id: editorRole.id, permission_id: p.id })),
      // viewer gets read only
      ...readPermissions.map(p => ({ role_id: viewerRole.id, permission_id: p.id })),
    ])

    // Owner gets admin
    await tx.user_tenant_roles.create({
      user_id: ownerUserId,
      tenant_id: tenant.id,
      role_id: adminRole.id,
    })

    return tenant
  })
}`}</code>
      </pre>

      <h2 id="anti-patterns">Anti-patterns to skip</h2>
      <ul>
        <li>
          <strong>String role flags scattered across columns.</strong>{" "}
          <code>is_admin</code>, <code>can_invite</code>, etc. on the
          users table. By month three you have fifteen columns and no
          consistent way to check them.
        </li>
        <li>
          <strong>Permissions as enums in code.</strong> Then your
          permission set is locked to deploy cycles. Permissions belong
          in the DB so admins can configure custom roles without a code
          change (later, when you let them).
        </li>
        <li>
          <strong>Skipping RLS because &ldquo;we always filter by
          tenant_id.&rdquo;</strong> Until somebody doesn&rsquo;t. The
          first cross-tenant data leak makes RLS look really cheap in
          hindsight.
        </li>
        <li>
          <strong>Building a permission DSL.</strong>{" "}
          <em>If user is owner OR (user has role X AND resource is not
          archived AND…)</em>. Resist this. Add a permission atom
          (<code>archive:override</code>) and assign it to the right role
          instead. Atoms compose; DSLs metastasize.
        </li>
      </ul>

      <h2 id="when-to-graduate">When to graduate to a policy engine</h2>
      <p>
        If you find yourself wanting:
      </p>
      <ul>
        <li>
          Cross-resource conditions (&ldquo;can edit invoice if it&rsquo;s
          owned by their project and not finalized and amount &lt;
          $10k&rdquo;).
        </li>
        <li>
          Time-windowed access (&ldquo;contractor role expires after 30
          days&rdquo;).
        </li>
        <li>
          Centralized policy across multiple services that all need to
          make the same authorization decisions.
        </li>
      </ul>
      <p>
        Then consider OPA (Open Policy Agent) or Cedar. Until that point,
        the four-table pattern handles real products at real scale.
        Adding a policy engine before you need one is the engineer&rsquo;s
        equivalent of switching to microservices on day one.
      </p>
    </>
  )
}
