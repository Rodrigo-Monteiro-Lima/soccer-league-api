FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package*.json .

RUN npm install

EXPOSE 3000

COPY . .

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]