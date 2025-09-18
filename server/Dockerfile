FROM node:18-alpine AS builder

WORKDIR /src

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src ./src
RUN npm run build


FROM node:18-alpine AS runner

WORKDIR /src

COPY package*.json  ./
RUN npm ci --omit=dev

COPY --from=builder /src/dist ./dist

EXPOSE 3001
CMD [ "node","dist/index.js" ]