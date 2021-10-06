FROM node:16 AS build
WORKDIR /app
COPY . .
RUN yarn install --production && \
  yarn run build

FROM gcr.io/distroless/nodejs:10
WORKDIR /app
COPY --from=build /app/build .
COPY --from=build /app/assets .
COPY --from=build /app/node_modules .
CMD [ "/app/build/index.js" ]
