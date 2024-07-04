FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 8080
ENV NODE_ENV production

RUN npm run build

EXPOSE 8080

CMD ["sh", "-c", "npm run getDBFromS3 && npm run start && npm run cron"]
