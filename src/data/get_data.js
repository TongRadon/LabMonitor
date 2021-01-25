import React, {Component} from 'react';
import socketIOClient from 'socket.io-client/dist/socket.io';
import AsyncStorage from '@react-native-community/async-storage';
import { AppRegistry, SectionList, StyleSheet, Text, View, Alert, Platform } from 'react-native';

async function loadMessages() {
  //const myAuthToken = await AsyncStorage.getItem('access_token');
  let myAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwZjE5YTBjNTA4YTBlYzRkNmVmN2QiLCJpYXQiOjE2MTEwNTM2ODcsImV4cCI6MTYxMTE0MDA4N30.LPASUgmPMSOiNFKgRAvJtiAt32s6hPq5gvXS6Ixnxl8";
  console.log(myAuthToken);
  const RETRY_INTERVAL = 1000;
  var timeout;
  let connected = false;
  const ENDPOINT = "http://103.199.7.185";
  const socket = socketIOClient.connect(ENDPOINT,{transports: ['websocket']});
  socket.emit('authenticate', {
    token: myAuthToken
  });
  console.log(socket);
  // socket.on('connect',function(){
  //   connected = true;
  //   console.log("Socket connected:");
  //   clearTimeout(timeout);
  //   socket.emit('authenticate', {
  //     token: myAuthToken
  //   });
    
  // });
  socket.on('lab_monitor',data => {
      console.log(data, " dataaa");
    });
  
  

  // socket.on('disconnect', () => {
  //   connected = false;
  //   console.log("Socket disconnected");
  //   retryConnectOnFailure(RETRY_INTERVAL);
  // });

  // var retryConnectOnFailure = function (retryInMilliseconds) {
  //   timeout = setTimeout(function () {
  //     if (!connected) {
  //       console.log("Try to connect...", connected)
  //       socket.on('connect',function(){
  //         connected = true;
  //         clearTimeout(timeout);
  //         console.log("Socket connected");
  //       });
  //       socket.connect("http://103.199.7.185");
  //       retryConnectOnFailure(retryInMilliseconds);
  //     }
  //   }, retryInMilliseconds);
  // }
  
}
export {loadMessages};