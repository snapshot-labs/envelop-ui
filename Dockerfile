FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "dev"]
