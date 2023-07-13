# Stage 1: Build the React application
FROM node:18.12.1-alpine as build
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the built application using a lightweight HTTP server
FROM node:18.12.1-alpine
WORKDIR /app

# Install serve to run the application
RUN npm install -g serve

# Copy the built application from the previous stage
COPY --from=build /app/dist ./dist

# Expose port 5000 for the application
EXPOSE 5000

# Start the application
CMD ["serve", "-s", "dist", "-l", "5000"]
