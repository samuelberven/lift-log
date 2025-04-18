FROM node:20-bullseye

WORKDIR /app

# Install dependencies (no need to install npm globally, it's built-in with Node)
COPY package.json ./
# COPY ./ts-frontend/package-lock.json ./
COPY package-lock.json ./


# Install dependencies using npm
RUN npm ci # Ensures a clean, consistent install using package-lock.json

# Copy the rest of the project files
COPY . .

# Start the Vite dev server
CMD ["npm", "run", "dev"]

EXPOSE 5173
