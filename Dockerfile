FROM node:18.18-alpine as builder
RUN mkdir -p /first-i12-web-backend
WORKDIR /first-i12-web-backend
COPY . .
RUN apk add --no-cache git openssh

RUN yarn install
RUN yarn build

FROM node:18.18-alpine
RUN mkdir -p /second-i12-web-backend
WORKDIR /second-i12-web-backend
COPY --from=builder /first-i12-web-backend/node_modules node_modules
COPY --from=builder /first-i12-web-backend/build build
COPY package.json package.json
COPY src    src
COPY config config
COPY public public
COPY favicon.ico favicon.ico
COPY .env .env
EXPOSE 3000

CMD ["yarn", "start"]

