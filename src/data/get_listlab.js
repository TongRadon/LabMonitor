import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { AppRegistry, SectionList, StyleSheet, Text, View, Alert, Platform } from 'react-native';

async function onLoadLabs() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${await AsyncStorage.getItem('access_token')}`);
  var raw = "";
  var responseJson_ID = [];
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
    try {
    let response = await fetch("http://103.199.7.185/api/device", requestOptions);
    let responseJson = await response.json();
    let total_lab = responseJson.length;
      for (let i = 0; i < total_lab; i = i + 1){
          lab = responseJson[i].device_id;
          try {
            let response1 = await fetch("http://103.199.7.185/api/get_device_info/"+lab, requestOptions);
            let responseJson1 = await response1.json();
            responseJson_ID.push(responseJson1)
          } catch (error) {
            console.error(`Error is : ${error}`);
          } 
        };
    if (response.status >= 200 && response.status < 300) {                    
      console.log("Response is successfully");
  } else {
      alert('Login again');
  }
    return responseJson_ID;
  } catch (error) {
    console.error(`Error is : ${error}`);
  }
  

  }
export {onLoadLabs};