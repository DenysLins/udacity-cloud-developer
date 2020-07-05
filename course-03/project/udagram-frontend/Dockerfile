FROM node:12 as builder

WORKDIR '/app'

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

FROM nginx

EXPOSE 8081

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/www /usr/share/nginx/html
