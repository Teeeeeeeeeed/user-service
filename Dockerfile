# syntax=docker/dockerfile:1
   
FROM node:18-alpine
# Set the working directory inside the container
WORKDIR /app
ENV NODE_ENV production

COPY package*.json ./

# Copy the rest of the application code
COPY . .

RUN npm install -g pnpm && \
    pnpm install --production

RUN git clone https://github.com/vishnubob/wait-for-it.git

RUN pnpm run build
# Expose the port your NestJS application listens on (change it if necessary)
EXPOSE 3000
# Start the application
CMD ["node","dist/main.js"]