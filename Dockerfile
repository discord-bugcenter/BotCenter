FROM node:16 AS build
WORKDIR /app
COPY . .
RUN yarn install --production && \
  yarn build

FROM gcr.io/distroless/nodejs:16
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/assets ./assets
COPY --from=build /app/node_modules ./node_modules
CMD [ "/app/build/index.js" ]
