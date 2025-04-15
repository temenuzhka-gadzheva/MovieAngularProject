FROM node:18-alpine

# Install git and docker
RUN apk add --no-cache git docker docker-compose bash

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN npm install

# Make update script executable
RUN chmod +x update.sh

# Expose webhook port
EXPOSE 3001

# Start the service
CMD ["node", "app.js"] 