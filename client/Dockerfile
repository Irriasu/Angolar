# Use the official Angular CLI image as the base image
FROM node:latest as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./



# Copy the rest of the application code to the working directory
COPY . /app/

# Install dependencies

RUN npm install

# Build the Angular app for production
RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist/client /usr/share/nginx/html


# Expose port 80 to the outside world
EXPOSE 80
