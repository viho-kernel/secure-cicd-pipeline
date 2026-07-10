FROM node:18-alpine
WORKDIR /app

# Patch known CVEs in base image packages
RUN apk update && apk upgrade --no-cache libcrypto3 libssl3

COPY package*.json ./
RUN npm install --omit=dev
COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["npm", "start"]