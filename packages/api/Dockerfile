FROM node:16-alpine

# Environment
WORKDIR /usr/temp
ENV NODE_ENV=production

# Dependencies
COPY . .
RUN yarn global add lerna typescript
RUN lerna bootstrap

# Build
WORKDIR /usr/temp/packages/api
RUN yarn build

# Start
EXPOSE 8080
CMD ["node", "dist/source/index.js"]
