import React, {Component} from 'react';
import socketIOClient from 'socket.io-client/dist/socket.io.js';
import AsyncStorage from '@react-native-community/async-storage';
import { AppRegistry, SectionList, StyleSheet, Text, View, Alert, Platform } from 'react-native';

const ENDPOINT = "http://103.199.7.185";
const socket = socketIOClient(ENDPOINT);
 
const RETRY_INTERVAL = 1000;
var timeout;
let connected = false;
getToken = async() =>{
  try{
    var token = await AsyncStorage.getItem(ACCESS_TOKEN);            
    console.log("token get is:" + token);
  }catch(e){
    console.log("Something went wrong get");
  }
}
socket.on('connect',function(){
  connected = true;
  clearTimeout(timeout);
	socket.emit('authenticate', {
		token: getToken(token)
	});
});

socket.on('disconnect', () => {
  connected = false;
  console.log("Socket disconnected");
  retryConnectOnFailure(RETRY_INTERVAL);
});

var retryConnectOnFailure = function (retryInMilliseconds) {
	timeout = setTimeout(function () {
		if (!connected) {
			console.log("Try to connect...", connected)
			socket.connect("http://103.199.7.185");
			retryConnectOnFailure(retryInMilliseconds);
		}
	}, retryInMilliseconds);
};
export {socket};

/*async function SocketIO() {
  const ENDPOINT = "http://103.199.7.185";
  const socket = io(ENDPOINT);
  const RETRY_INTERVAL = 1000;
  var timeout;
  let connected = false;
  socket.on('connect',function(){
    connected = true;
    clearTimeout(timeout);
    socket.emit('authenticate', {
      token: getToken(token)
    });
  });
  
  socket.on('disconnect', () => {
    connected = false;
    console.log("Socket disconnected");
    retryConnectOnFailure(RETRY_INTERVAL);
  });
  
  getToken = async() =>{
      try{
        var token = await AsyncStorage.getItem(ACCESS_TOKEN);            
        console.log("token get is:" + token);
      }catch(e){
        console.log("Something went wrong get");
      }
    }
  
  var retryConnectOnFailure = function (retryInMilliseconds) {
    timeout = setTimeout(function () {
      if (!connected) {
        console.log("Try to connect...", connected)
        socket.connect("http://103.199.7.185");
        retryConnectOnFailure(retryInMilliseconds);
      }
    }, retryInMilliseconds);
  };
  }
export {SocketIO};*/