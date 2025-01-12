# Build Stage
FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV STANDALONE_OUTPUT_MODE=yes
RUN npm run build
# Runtime Stage
FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/.next/standalone .
COPY --from=build /usr/src/app/.next/static .next/static
# COPY --from=build /usr/src/app/public public
EXPOSE 3000
CMD ["node", "server"]
