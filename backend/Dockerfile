# Dockerfile (backend)

# Use the Node.js official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code to the container
COPY . .

# Expose the port the backend will run on
EXPOSE 3000

# Start the backend server
CMD ["node", "server.js"]
