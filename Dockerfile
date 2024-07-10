# Stage 1: Build the application
FROM node:18-slim AS builder

# Set the working directory
WORKDIR /stat-ee

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Create the final image
FROM node:18-slim

# Set the NODE_ENV to production
ENV NODE_ENV production

# Set the working directory
WORKDIR /stat-ee

# Copy only the necessary files from the builder stage
COPY --from=builder /stat-ee/package*.json ./
COPY --from=builder /stat-ee/node_modules ./node_modules
COPY --from=builder /stat-ee/dist ./dist

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD [ "node", "dist/src/app.js" ]