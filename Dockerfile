# Stage 1: Build
FROM node:lts-bookworm-slim as builder

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
COPY package.json ./

# Install dependencies, including TypeScript
RUN npm install
# Rebuild TensorFlow
RUN npm rebuild @tensorflow/tfjs-node --build-from-source


# Install ncc globally
RUN npm i -g @vercel/ncc

# Copy the application source code
COPY . .

# Necessary for packaging the project
RUN npm run pack

# Stage 2: Production image
# Start with a clean image
FROM node:lts-bookworm-slim

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

# Use volumes for the certs directory
VOLUME ["/home/appuser/stat-ee/certs"]
# Use volumes for the models directory
VOLUME ["/home/appuser/stat-ee/models"]
# Set user before running further commands
USER appuser


# Define the command to run your app using CMD which defines your runtime
CMD ["node", "dist/index.js"]