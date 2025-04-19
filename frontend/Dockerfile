# Use lightweight Node.js image for build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package.json and package-lock.json first (optimizes Docker layer caching)
COPY package.json package-lock.json ./

# Install dependencies using npm ci
RUN npm ci

# Copy the rest of the frontend source code
COPY . .

# Build the Vite app
RUN npm run build

# -- Deployment-ready production stage --
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the frontend port
EXPOSE 4173

# Serve the built React (Vite) project
CMD ["npm", "run", "preview"]


# # Use lightweight Node.js image
# FROM node:20-alpine AS builder

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json before the rest (optimizes caching)
# COPY package.json package-lock.json ./

# # Install dependencies using npm ci (clean install, consistent with lock file)
# RUN npm ci

# # Copy frontend source code AFTER installing dependencies (reduces rebuilds)
# COPY . .

# # Build the frontend
# RUN npm run build

# # -- Deployment-ready build (Production) --
# FROM node:20-alpine AS runtime
# WORKDIR /app

# # Copy over build artifacts from the previous stage
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/package.json ./package.json

# # Install only production dependencies
# RUN npm ci --omit=dev

# # Expose the frontend port
# EXPOSE 4173

# # Serve the built React (Vite) project
# CMD ["npm", "run", "preview"]
