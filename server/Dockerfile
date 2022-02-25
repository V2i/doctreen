FROM node:14-slim

WORKDIR server/

COPY package.json /server

RUN npm install

COPY . /server

EXPOSE 5000

CMD ["npm", "build"]
CMD ["npm", "start"]
