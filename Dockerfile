# Stage 1: Build
# Use an official Node.js runtime as a parent image
FROM node:20.15-buster as builder

# Set the working directory inside the builder stage
WORKDIR /home/appuser/build

# Copy only necessary dependency definitions
COPY package.json package-lock.json* ./

# Install dependencies including 'devDependencies'
# Necessary for building the project
RUN npm install
# Rebuild Tensorflow
RUN npm rebuild @tensorflow/tfjs-node --build-from-source
# Copy the application source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Production image
# Start with a clean image
FROM node:20.15-buster

# Create a group and user with specified UID and GID
RUN groupadd -r appgroup -g 1001 && useradd -r -g appgroup -u 1001 -m appuser

# Set the working directory inside the container
WORKDIR /home/appuser/stat-ee


# Copy only the built artifacts from the build stage
COPY --from=builder --chown=appuser:appgroup /home/appuser/build/dist ./dist
# Copy only the node_modules
COPY --from=builder --chown=appuser:appgroup /home/appuser/build/node_modules ./node_modules
# Copy only the models 
COPY --from=builder --chown=appuser:appgroup /home/appuser/build/models ./models

# Set user before running further commands
USER appuser

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "dist/src/app.js"]