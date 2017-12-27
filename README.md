# Recepies UI
UI for Recepies API based on React

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Getting started
### Install
Clone this repository, then run the following command
```
$ npm install
```
### Running
#### Development
The following command will start a small node server in development mode and open up a browser tab. Any changes to the source files will recompile and reload the page automatically.
```
$ npm start
```
#### Production
To build for production, issue the following command
```
$ npm start
```
All output will end up in the `build/` directory. To try it out, serve it using a static web server. The build command suggests:
```
$ yarn global add serve
$ serve -s build
```
#### Build docker
The build script `build.sh` will both do the previous step, and then copy the build directory into a new docker image based on the [varsego](https://github.com/eriklindqvist/varsego) base image. Make sure to download and build this image first.
```
$ ./build.sh
```

#### Running docker
The resulting docker image contains everything needed to run the UI. Simply start it either by using the provided docker-compose file
```
$ docker-compose up
```
or manually
```
$ docker run -p 3003:3003 recipe_ui
```
