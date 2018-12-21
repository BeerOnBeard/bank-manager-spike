FROM node:carbon-alpine as builder
USER node
WORKDIR /home/node
COPY --chown=node:node src ./
RUN npm i
RUN npm run build

FROM node:carbon-alpine
USER node
ENV NODE_ENV=production
WORKDIR /home/node
COPY --from=builder --chown=node:node /home/node/release ./
CMD node server.js
