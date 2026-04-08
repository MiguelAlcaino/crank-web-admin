# Multi-stage build for Vue.js admin application

# Stage 1: Build the application
FROM node:22-alpine AS builder

ARG VITE_CRANK_REST_SERVER_URL
ARG VITE_CRANK_GRAPHQL_SERVER_URL

# Convert ARGs to ENV variables so Vite can access them during build
ENV VITE_CRANK_REST_SERVER_URL=${VITE_CRANK_REST_SERVER_URL}
ENV VITE_CRANK_GRAPHQL_SERVER_URL=${VITE_CRANK_GRAPHQL_SERVER_URL}

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the standalone app (not the library)
RUN npx vite build --config vite.config.app.ts

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
