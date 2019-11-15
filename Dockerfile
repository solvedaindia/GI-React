FROM node:10.15.3
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD [ "npm", "run", "start"]