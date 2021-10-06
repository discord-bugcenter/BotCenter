FROM node:16 AS build
WORKDIR /app
COPY . .
RUN yarn install --production && \
  yarn run build

FROM gcr.io/distroless/nodejs:10
COPY --from=build /app/build /app/assets /app/node_modules /app/
CMD [ "/app/build/index.js" ]
