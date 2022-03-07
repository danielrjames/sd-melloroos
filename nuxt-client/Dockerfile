FROM node:latest

ENV HOST 0.0.0.0

WORKDIR /app

COPY package.json yarn.lock ./

COPY eslint eslint/*

RUN yarn install

COPY . .

RUN yarn build
