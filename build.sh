#!/bin/sh

# Backup symbolic link
cd public
if [ -L images ]; then
  arr=($(ls -o images | cut -d ' ' -f 8,10))
  unlink images
fi
cd ..

npm run build
docker build -t recepies_ui .
docker tag recepies_ui:latest proto:5000/recepies_ui

# Restore symbolic link
if [ ! -z ${arr+x} ]; then
  cd public
  ln -s ${arr[1]} ${arr[0]}
  cd ..
fi
