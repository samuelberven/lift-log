# Frontend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Explicitly set NODE_ENV to development during installation
ENV NODE_ENV=development

# Install dependencies including devDependencies
RUN npm ci

# Copy the rest of the frontend source code
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Default command (can be overridden by docker-compose)
CMD ["npm", "run", "dev"]


# # Lightweight image for both development and production
# FROM node:20-alpine AS builder

# WORKDIR /app

# # # Copy only package.json and package-lock.json first (optimizes Docker layer caching)
# # COPY package.json package-lock.json ./

# # Copy package files for dependency installation
# COPY package*.json ./

# # Install all dependencies (including dev dependencies)
# ENV NODE_ENV=development

# # Install dependencies using npm ci
# RUN npm ci

# # Copy the rest of the frontend source code
# COPY . .

# # Build the Vite app
# RUN npm run build

# # -- Deployment-ready production stage --
# FROM node:20-alpine AS runtime

# WORKDIR /app

# # Copy built assets from builder stage
# COPY --from=builder /app/dist ./dist
# # COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/package*.json ./

# # Install only production dependencies
# RUN npm ci --omit=dev

# # Expose the frontend port
# EXPOSE 4173

# # Serve the built React (Vite) project
# CMD ["npm", "run", "preview"]
# # CMD ["npm", "run", "dev"]
