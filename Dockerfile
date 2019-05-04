FROM node:8
WORKDIR /app
COPY . ./
RUN npm install
RUN npm rebuild node-sass
RUN npm run build
