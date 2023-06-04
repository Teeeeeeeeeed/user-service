# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install -g pnpm && \
    pnpm install --production
CMD ["pnpm", "run","start"]
EXPOSE 3000