FROM node:14.19.0

RUN mkdir /home/node/hyperion
WORKDIR "/home/node/hyperion"
RUN npm i discord.js@12.5.3 fs request exceljs @discordjs/opus opusscript
COPY . /home/node/hyperion
CMD [ "/bin/bash","-c","node index.js > log/ConsoleFile.txt" ]
