# Use an official Node.js runtime as the base image
FROM node:slim

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY packages/app/package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY packages/app/ .

# Expose the port your app will run on
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "start"]
