FROM node:16-alpine AS build
WORKDIR /home/botcenter
COPY . .
RUN yarn install --production && \
  yarn run build

FROM gcr.io/distroless/nodejs:10
WORKDIR /home/botcenter
COPY --from=build /home/botcenter/ /app
CMD [ "./build/index.js" ]
