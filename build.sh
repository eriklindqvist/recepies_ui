#!/bin/sh

npm run build
docker build -t recipe_ui .
