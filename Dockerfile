FROM node:16 AS build
WORKDIR /app

COPY . .

RUN yarn install --production && \
  yarn build


FROM gcr.io/distroless/nodejs:16

COPY --from=build /app/build /app/assets /app/node_modules /

WORKDIR /app/build

ENTRYPOINT [ "index.js" ]
