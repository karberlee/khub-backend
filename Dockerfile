# set node base image
FROM node:20.17.0

# set work dir
WORKDIR /usr/src/khub

# copy build content into image
COPY ./dist .

# install dependencies
RUN npm install --ignore-scripts

# expose ports which will be used
EXPOSE 3000

# create not root user
RUN addgroup --system nonroot \
    && adduser --system --ingroup nonroot nonroot

# use not root user
USER nonroot

# exec start command
CMD ["node", "app.js"]
