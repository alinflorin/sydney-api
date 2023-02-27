FROM node:lts-alpine as builder
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm i -f
COPY . .
RUN npm run build
EXPOSE 3000
CMD node dist/index.js