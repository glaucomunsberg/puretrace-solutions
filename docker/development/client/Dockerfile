FROM node:20-alpine

ARG GIT_TAG='1.0.0-dev'
ARG REACT_APP_API_URL='http://rails:3006'

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk add git python3 make g++

RUN mkdir -p /app

WORKDIR /app

COPY --chown=node:node .git/ .

RUN git describe --tags --abbrev=0 > /.env

RUN npm install -g corepack@latest pnpm@10.3.0
RUN corepack enable

COPY --chown=node:node client/package.json /app
COPY --chown=node:node client/pnpm-lock.yaml /app

RUN pnpm install

COPY --chown=node:node client/ app/

COPY docker/development/client/entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 4000
