FROM node:12-alpine AS build

RUN apk add --no-cache \
    gcc \
    git \
    g++ \
    libc-dev \
    make \
    python

WORKDIR /build
COPY package*.json ./
RUN npm install --production


FROM node:12-alpine AS runner

EXPOSE 8080
WORKDIR /app
COPY --from=build /build/ ./
COPY . .
CMD [ "npm", "start" ]
