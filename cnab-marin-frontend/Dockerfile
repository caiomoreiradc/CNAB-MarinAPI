FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Teste se o build foi feito corretamente
RUN ls -la /app/dist

FROM nginx:alpine
RUN ls -la /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3333
CMD ["nginx", "-g", "daemon off;"]
