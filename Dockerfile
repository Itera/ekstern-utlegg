FROM node:19.0.1-slim

RUN npm i -g serve

WORKDIR /app

COPY build .

ENTRYPOINT ["serve", "--single", "/app"]