/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {LoginScreen, MainScreen} from '../screens/screenNames';
import { AsyncStorage } from 'react-native';
import Main from './main';
const ACCESS_TOKEN = 'token';

export default class Login extends Component {
  constructor(props){
      super(props);

      this.state ={
          email: "",
          password: "",
          error: ""
      }
  }

  ComponentDidMount(){
      this._loadInitialState().done();
  }

  _loadInitialState = async () => {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (token !== null) {
          this.props.navigation.navigate('Main'); 
      }
  }

  async storeToken(token) {
      try {
          await AsyncStorage.setItem(ACCESS_TOKEN, token);
          this.getToken();
      } catch(error) {
          console.log("Something went wrong")
      }
  }

  async getToken() {
      try {
          let token = await AsyncStorage.getItem(ACCESS_TOKEN);            
          console.log("token is:" + token);
      } catch(error) {
          console.log("Something went wrong")
      }
  }

  async onLoginButtonPress() {
      try {
          let response = await fetch('http://103.199.7.185/api/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
          });

          let res = await response.json();
          if (response.status >= 200 && response.status < 300) {
              this.setState({error: ""});
              let token = res.token;
              this.storeToken(token);                       
              console.log("Response success is: " + token);

              this.props.navigation.navigate('MainScreen');
              //alert('valid username or password');
          } else {
              //let error = res;
              //throw error;
              alert('Invalid username or password')
              
          }
      } catch(error){
          console.log("catch error: " + error);
          let formError = JSON.parse(error);
          let errorArray = [];
          for(let key in formError) {
              if(formError[key].length > 1){
                  formError[key].map(error => errorArray.push(`${key} ${error}`))
              } else {
                  errorArray.push(`${key} ${formError[key]}`)
              }
          }
          this.setState({error: errorArray});
      }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.welcome}>
            <Text style={styles.title}> 
            TMA Lab monitoring
            </Text>
          </View>
          <View style={styles.login_mail}>
            <View style={styles.textInputContainer}>   
              <TextInput
              style={styles.textInput}
              textContentType='emailAddress'
              placeholder="Enter your email"
              keyboardType='email-address'
              onChangeText={(email)=>this.setState({email})}
              
              >
              </TextInput>
            </View>
            <View 
            style={styles.textInputContainer}>
              <TextInput
              style={styles.textInput}
              keyboardType='default'
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={(password)=>this.setState({password})}
              
              >
              </TextInput>
            </View>
            <TouchableOpacity 
            style={styles.loginButton}
            onPress={this.onLoginButtonPress.bind(this)}
            >
              <Text style={styles.textInputLogin}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback> 
     );
  }


}

const styles = StyleSheet.create({
  container:{
    flex:5,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'stretch',
    backgroundColor:'white'
  },
  welcome:{
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#0067a7'
  },
  login_mail:{
    flex: 7,
    flexDirection: 'column',
    backgroundColor:'#0067a7',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title:{
    color: 'white',
    flexDirection: 'row',
    textAlign: 'center',
    width: 500,
    fontSize: 40
  },
  textInputContainer:{
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  textInput: {
    width: 280,
    height: 45
  },
  loginButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    marginTop: 20,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#3b5998'

  },
  textInputLogin: {
    width: 280,
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
})
