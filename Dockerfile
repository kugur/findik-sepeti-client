#Dependency Stage
FROM node:18-alpine as findik-sepeti-client-dependencies 
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

#build stage
FROM findik-sepeti-client-dependencies as findik-sepeti-build
WORKDIR /app
ARG REACT_APP_SERVER_URL
ARG REACT_APP_IMAAGE_URL_ROOT

ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL
ENV REACT_APP_IMAAGE_URL_ROOT=$REACT_APP_IMAAGE_URL_ROOT

COPY . .
RUN npm run build

#Production Stage
FROM nginx:alpine

COPY --from=findik-sepeti-build  /app/build /usr/share/nginx/html
COPY ./nginx/config/default.conf /etc/nginx/conf.d/
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
