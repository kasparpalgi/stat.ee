# Stage 1: Build
FROM node:lts-buster-slim as builder

# Install necessary packages for TensorFlow.js and glibc compatibility
RUN apt-get update && \ 
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \ 
    libc6-dev 

# Set the working directory inside the builder stage
WORKDIR /home/appuser/build

# Copy only necessary dependency definitions
COPY package.json package-lock.json* ./

# Install dependencies including 'devDependencies'
# Necessary for building the project
RUN npm install
# Rebuild TensorFlow
RUN npm rebuild @tensorflow/tfjs-node --build-from-source
# Copy the application source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Production image
# Start with a clean image
FROM node:lts-buster-slim

# Install glibc for compatibility
RUN apt-get update && \ 
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \ 
    libc6-dev 

# Create a group and user with specified UID and GID
RUN addgroup --system appgroup && adduser --system --ingroup appgroup --home /home/appuser appuser

# Set the working directory inside the container
WORKDIR /home/appuser/stat-ee

# Copy only the built artifacts from the build stage
COPY --from=builder /home/appuser/build/dist ./dist

# Copy the package.json and package-lock.json to the production image
COPY --from=builder /home/appuser/build/package.json /home/appuser/build/package-lock.json ./

# Install only production dependencies
RUN npm install --only=production

# Rebuild TensorFlow
RUN npm rebuild @tensorflow/tfjs-node --build-from-source

# Use volumes for the certs directory
VOLUME ["/home/appuser/stat-ee/certs"]
# Use volumes for the models directory
VOLUME ["/home/appuser/stat-ee/models"]
# Set user before running further commands
USER appuser

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "dist/src/app.js"]