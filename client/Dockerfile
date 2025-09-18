FROM node:18-alpine AS builder

WORKDIR /src
COPY package*.json tsconfig*.json vite.config.* ./
RUN npm ci
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:alpine
COPY --from=builder /src/dist  /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx","-g","daemon off" ]