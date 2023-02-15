FROM node

WORKDIR /app

COPY package.json ./

RUN npm install
Run npm install -g expo-cli

COPY . .

ENTRYPOINT ["expo", "start"]