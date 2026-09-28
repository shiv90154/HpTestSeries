# Production image (see deploy/). Build runs with host networking so `next build` can read the
# database for statically generated pages; runtime env comes from deploy/.env.production.

FROM node:22-bookworm-slim AS deps
WORKDIR /app
# Prisma's schema engine (migrations) needs OpenSSL
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
# postinstall runs `prisma generate` (needs the schema, not a database)
RUN npm ci --no-audit --no-fund

# Full source + toolchain without a build: the one-off migrate/seed/admin-script image.
# (It must not need the database, because it creates the tables.)
FROM deps AS tools
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN mkdir -p public

FROM tools AS builder
# The env file is mounted only for this step (BuildKit secret), so it never lands in an image layer.
RUN --mount=type=secret,id=env,target=/app/.env npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
# Uploaded question/blog images live here (a named volume in production, see deploy/docker-compose.yml).
# Created in the image so the volume starts out owned by the node user.
RUN mkdir -p /app/uploads && chown node:node /app/uploads
USER node
CMD ["node", "server.js"]
