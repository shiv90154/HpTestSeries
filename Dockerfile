# Production image (see deploy/). Build runs with host networking so `next build` can read the
# database for statically generated pages; runtime env comes from deploy/.env.production.

FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
# postinstall runs `prisma generate` (needs the schema, not a database)
RUN npm ci --no-audit --no-fund

# Full toolchain: builds the app, and doubles as the one-off migrate/seed/admin-script image.
FROM deps AS builder
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN mkdir -p public
# The env file is mounted only for this step (BuildKit secret), so it never lands in an image layer.
RUN --mount=type=secret,id=env,target=/app/.env npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
USER node
CMD ["node", "server.js"]
