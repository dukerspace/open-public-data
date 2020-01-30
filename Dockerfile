FROM node:12.14.1-stretch
LABEL maintainer="dukerspace <montolsaklor@gmail.com>"

COPY . /var/www/air

# Install pm2
RUN npm install pm2 g

RUN npm install -g typescript
RUN pm2 install typescript
RUN pm2 install ts-node

WORKDIR /var/www/air

RUN npm install

# Expose ports needed to use Keymetrics.io
EXPOSE 80 443 43554
