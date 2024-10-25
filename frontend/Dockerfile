# Dockerfile (frontend)

# Build the Vue.js app
FROM node:18 AS build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Build the app for production
RUN npm run build

# Serve the app using Nginx
FROM nginx:alpine AS production-stage

# Copy the build output to Nginx public folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
