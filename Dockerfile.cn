# set node base image
FROM node:20.17.0

# set npm registry
RUN npm config set registry https://registry.npmmirror.com/

# set work dir
WORKDIR /usr/src/khub

# copy build content into image
COPY ./dist .

# install dependencies
RUN npm install

# expose ports which will be used
EXPOSE 3000

# exec start command
CMD ["node", "app.js"]
