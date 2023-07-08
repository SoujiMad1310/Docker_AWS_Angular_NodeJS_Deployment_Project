FROM node as node
ENV NODE_OPTIONS="--openssl-legacy-provider"
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/angular_onlinetest_proj /usr/share/nginx/html
