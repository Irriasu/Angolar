# Use the official Angular CLI image as the base image
FROM node:latest as builder

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


# Expose port 80 to the outside world
EXPOSE 80

CMD ["ng", "serve"]