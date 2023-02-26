FROM node:lts-alpine
RUN apk update
RUN apk add
RUN apk add ffmpeg
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm i -f
COPY . .
EXPOSE 3000
CMD npm start