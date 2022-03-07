FROM node:14.19.0

COPY ./package.json /home/node/hyperion/package.json
WORKDIR "/home/node/hyperion"
RUN npm i
COPY . /home/node/hyperion
CMD [ "/bin/bash","-c","npm start" ]
