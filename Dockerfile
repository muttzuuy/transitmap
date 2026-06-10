# Multi-stage Dockerfile for React + Vite (build with Node, serve with nginx)

### Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies (including devDependencies needed for build)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build


### Production stage: lightweight nginx to serve static files
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Replace default nginx config with our SPA-friendly config
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
