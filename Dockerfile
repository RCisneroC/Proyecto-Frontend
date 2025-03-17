# stage 1
FROM node:16.20.0 as node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build 

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/spire /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

