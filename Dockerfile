FROM node:10-alpine

WORKDIR /usr/src/app

#ENV PATH /usr/src/app/node_modules/.bin:$PATH

#RUN npm install -g nodemon
#RUN npm config set registry https://registry.npmjs.org
COPY package*.json /usr/src/app/

RUN npm install -g @angular/cli
#RUN npm i --only=dev
RUN npm install
RUN apk add net-tools

COPY . /usr/src/app

EXPOSE 4200 49153

CMD ["npm", "start"]