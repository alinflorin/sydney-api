FROM node:lts-alpine as builder
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm i -f
COPY . .
RUN npm run build


FROM node:lts-alpine
COPY --from=builder /app/dist /app
EXPOSE 3000
WORKDIR /app
CMD node index.js