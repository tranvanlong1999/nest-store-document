# syntax=docker/dockerfile:1

# Stage 1: Build Docusaurus static site.
FROM node:lts AS builder
## Disable colour output from yarn to make logs easier to read.
ENV FORCE_COLOR=0
## Enable corepack.
RUN corepack enable
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus
## Copy over the source code.
COPY . /opt/docusaurus/
## Install dependencies with `--frozen-lockfile` to ensure reproducibility.
RUN pnpm install --frozen-lockfile
## Build the static site.
RUN pnpm build

# Stage 2: Serve with Caddy.
FROM caddy:2-alpine
## Copy the Caddyfile.
COPY --from=builder /opt/docusaurus/Caddyfile /etc/caddy/Caddyfile
## Copy the Docusaurus build output.
COPY --from=builder /opt/docusaurus/build /var/docusaurus
## Expose port.
EXPOSE 3000
## Add health check for production.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1