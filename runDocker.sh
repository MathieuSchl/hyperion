#docker rm -f hyperion

#docker image rm hyperion:latest

#docker build -t hyperion .

docker run -itd\
  --name hyperion \
  --restart=always \
  -v /home/debian/hyperion/storage/data:/home/node/hyperion/storage/data \
  -v /home/debian/hyperion/storage/table_de_decryptage:/home/node/hyperion/storage/table_de_decryptage \
  -v /home/debian/hyperion/storage/soundFunctions/data:/home/node/hyperion/storage/soundFunctions/data \
  -v /home/debian/hyperion/log:/home/node/hyperion/log \
  hyperion #node /home/node/hyperion/index.js
