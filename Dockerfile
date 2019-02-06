FROM node:11.9.0-alpine

RUN npm i -g serve

WORKDIR /app

COPY build .

ENTRYPOINT ["serve", "--single", "/app"]