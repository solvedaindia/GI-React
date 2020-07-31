FROM node:10.15.3-alpine AS build-dependency
RUN apk add \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm
RUN apk update && apk upgrade && \
    apk add --no-cache git
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM node:10.15.3-alpine AS runtime
RUN apk update && apk upgrade && \
    apk add --no-cache git
WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY --from=build-dependency ./app/build /app/build
COPY ./app /app/app
COPY ./middlewares /app/middlewares
COPY index.js /app
COPY logger.js /app
COPY argv.js /app
COPY port.js /app
CMD [ "npm", "run", "start:prod"]
