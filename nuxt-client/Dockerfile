FROM node:latest

ENV HOST 0.0.0.0

WORKDIR /app

COPY package.json yarn.lock ./

COPY eslint eslint/*

RUN yarn install

RUN yarn cache clean

COPY . .

RUN yarn build
