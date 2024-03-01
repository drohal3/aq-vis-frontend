FROM node:18 as build

WORKDIR /usr/src/app

COPY . .

RUN npm install && \
    npm run build

FROM alpine:3.16.0

WORKDIR /usr/src/app

COPY --from=build-stage /usr/src/app .

RUN apk update && \
    apk add --no-cache nodejs npm && \
    npm install -g serve && \
    adduser --disabled-password appuser && \
    chown appuser . && \
    apk del npm && \
    rm -rf /var/lib/apt/lists/*

USER appuser

CMD serve -s -l 5000 dist