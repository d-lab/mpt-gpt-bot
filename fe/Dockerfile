# from node
FROM node:16-alpine as build

COPY . /app

WORKDIR /app

RUN yarn install

RUN yarn dev

# from nginx
FROM nginx:1.17.9-alpine

# copy /build and src/static/index.html to a publish folder
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/src/static/index.html /usr/share/nginx/html/index.html