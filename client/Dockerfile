# Use the official Angular CLI image as the base image
FROM node:14 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular app for production
RUN npm run build

# Use NGINX as the final base image to serve the Angular app
FROM nginx:alpine

# Copy the built Angular app from the builder stage to the NGINX HTML directory
COPY --from=builder /app/dist/MyApp /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80
