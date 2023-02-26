FROM node:lts-alpine as builder
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm i -f
COPY . .
CMD npm start