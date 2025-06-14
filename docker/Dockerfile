# Stage 1: Build the Angular application
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration production

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

RUN apk add --no-cache wget

COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/online-movies-app/* /usr/share/nginx/html/

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 