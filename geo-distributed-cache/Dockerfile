FROM node:latest
#WORKDIR '/var/www/app'

WORKDIR /usr/app
COPY ./ ./
## Install project dependencies
RUN npm install
## Running default command
CMD ["npm", "start"]