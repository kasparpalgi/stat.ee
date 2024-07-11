FROM node:20.15-buster

# Set the working directory
WORKDIR /stat-ee
# Set the PATH to include the node_modules/.bin directory
ENV PATH /stat-ee/node_modules/.bin:$PATH

# Copy the package.json and package-lock.json files
COPY package.json ./
COPY package-lock.json ./

# Copy the tsconfig.json file
COPY tsconfig.json ./
# Install dependencies
RUN npm install --silent

# Rebuild Tensorflow
RUN npm rebuild @tensorflow/tfjs-node --build-from-source

# Copy the rest of the application code
COPY . ./

# start app
CMD ["npm", "run","start"]    