FROM node:8-alpine

RUN npm i -g serve

WORKDIR /app

COPY build .

ENTRYPOINT ["serve", "--single", "/app"]