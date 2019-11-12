# base image
FROM node:12.2.0

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

RUN npm install -g @angular/cli@7.3.0
# Install app dependencies
RUN mkdir /build-dir
WORKDIR /build-dir
COPY package.json /build-dir
RUN npm install -g babel babel-runtime babel-register mocha nodemon
RUN npm install

RUN mkdir /app
# set working directory
WORKDIR /app
RUN ln -s /build-dir/node_modules node_modules

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
# COPY package.json /app/package.json
# RUN npm install

EXPOSE 49153
# add app
COPY . /app
RUN ls 
# start app
# CMD ng serve --host 0.0.0.0
CMD [ "npm", "start" ]