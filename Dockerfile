FROM node:12.14.1-stretch
LABEL maintainer="dukerspace <montolsaklor@gmail.com>"

COPY ../air /var/www/air

# Install pm2
RUN npm install pm2 -g

WORKDIR /var/www/air

RUN npm install

# Expose ports needed to use Keymetrics.io
EXPOSE 80 443 43554