FROM node:lts-alpine
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
CMD ["node", "src/app.js"]