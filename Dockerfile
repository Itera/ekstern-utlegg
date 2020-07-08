FROM node:12.14.1-slim

RUN npm i -g serve

WORKDIR /app

COPY build .

ENTRYPOINT ["serve", "--single", "/app"]