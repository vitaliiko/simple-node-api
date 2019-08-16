FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY . /usr/src/app

RUN apk add --no-cache curl

HEALTHCHECK --interval=5s --timeout=2s --retries=5 \
    CMD curl --silent --fail localhost:3000/users || exit 1

CMD [ "npm", "start" ]
