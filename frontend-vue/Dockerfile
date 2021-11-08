FROM node:16.10
RUN npm install -g @vue/cli
WORKDIR /code
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install