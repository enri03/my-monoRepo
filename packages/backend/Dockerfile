# Use an official Node.js runtime as the base image
FROM node:slim


# Set the working directory to /backend
WORKDIR /backend

# Copy package.json and package-lock.json to the container
COPY packages/backend/package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the backend code to the container
COPY packages/backend/ .

# Expose the port your backend server will run on
EXPOSE 5000

# Define the command to start your backend application
CMD ["npm", "start"]
