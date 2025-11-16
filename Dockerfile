FROM node:20-bookworm-slim AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:20-bookworm-slim AS runner

WORKDIR /app

RUN apt-get update && \
    apt-get install -y netcat-openbsd dos2unix && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

COPY package.json ./

RUN pnpm install --prod

COPY --from=builder /app/dist ./dist

COPY docker-entrypoint.sh /app/
RUN dos2unix /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]

CMD [ "pnpm", "start"]