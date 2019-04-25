FROM node:10.15.3-slim
RUN mkdir -p /app/server
WORKDIR /app/server
COPY package*.json ./
#USER node
RUN npm install
# Bundle app source
COPY . /app/server
EXPOSE 5000
CMD npm start
