FROM node:14

RUN npm i -g @nestjs/cli

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]