# STAGE 1: Build the application
FROM node:22-alpine3.22 AS builder

WORKDIR /app
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile


# Accept the build arguments passed from docker-compose
ARG CEREBRAS_API_KEY
ARG GUARDRAIL_INTERNAL_CEREBRAS_KEY
ARG UPSTASH_REDIS_REST_URL
ARG UPSTASH_REDIS_REST_TOKEN

# Make them available as environment variables for the build process
ENV CEREBRAS_API_KEY=$CEREBRAS_API_KEY
ENV GUARDRAIL_INTERNAL_CEREBRAS_KEY=$GUARDRAIL_INTERNAL_CEREBRAS_KEY
ENV UPSTASH_REDIS_REST_URL=$UPSTASH_REDIS_REST_URL
ENV UPSTASH_REDIS_REST_TOKEN=$UPSTASH_REDIS_REST_TOKEN

# Copy the rest of the application source code
COPY . .
# Build the Next.js app for production
RUN pnpm build

# STAGE 2: Create the final, small production image
FROM node:22-alpine3.22

WORKDIR /app

RUN npm install -g pnpm

# Copy only the necessary built files from the 'builder' stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["pnpm", "start"]