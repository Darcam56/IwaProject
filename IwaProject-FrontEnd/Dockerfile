FROM node:12-alpine as FRONT-BUIDLER

WORKDIR /workdir

# Dependences
COPY package.json /workdir/package.json
COPY package-lock.json /workdir/package-lock.json

RUN npm install

# Project Sources (Retirer .idea ?)
COPY . /workdir

RUN npm run build-prod

FROM nginx:1.17.5-alpine

COPY --from=FRONT-BUIDLER /workdir/dist/frontEnd-client /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
