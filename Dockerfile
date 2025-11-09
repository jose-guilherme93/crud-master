# --- STAGE 1: BUILDER (Compilação e Instalação de Dependências) ---
FROM node:20-alpine AS builder

# Instalação do pnpm.
RUN npm install -g pnpm

WORKDIR /app

# Copia arquivos de configuração e instala dependências.
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copia o código-fonte e executa o build.
COPY . .
# Script de build: "build": "tsc && tsc-alias && cp -R src/migrations dist/migrations"
RUN pnpm run build

# --- STAGE 2: PRODUCTION (Ambiente de Execução Final) ---
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

# Copia artefatos: package.json, node_modules e código compilado.
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expõe a porta.
EXPOSE ${PORT}

# Comando de Início Otimizado:
# Para garantir que o container da aplicação só inicie o servidor 
# DEPOIS que as migrações forem aplicadas, usamos um script shell.
# O script 'migrate' é "node dist/scripts/exec-migrations.js".
# O script 'start' é "node dist/server.js".
CMD [ "/bin/sh", "-c", "node dist/scripts/exec-migrations.js && node dist/server.js" ]