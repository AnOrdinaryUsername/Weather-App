FROM node:14-alpine

# Create Bits directory
WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install

COPY . .

# Expose port
EXPOSE 8080

# Default command that starts webpack-dev-server
CMD ["npm", "run", "docker-init"]