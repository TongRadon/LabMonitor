import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {LoginScreen, MainScreen} from '../screens/screenNames';
import AsyncStorage from '@react-native-community/async-storage';
import Main from './main';
const ACCESS_TOKEN = 'access_token';

export default class Login extends Component {
  constructor(props){
      super(props);

      this.state ={
          email: "",
          password: "",
          error: ""
      }
  }

  componentDidMount(){
      this._loadInitialState().done();
  }

  _loadInitialState = async () => {
      let token = await AsyncStorage.getItem('access_token');
      console.log("Runing Function")
      if (token !== null) {
          
          this.props.navigation.navigate('MainScreen'); 
      }
  }

  storeToken = async(token) => {
    try{
      await AsyncStorage.setItem(ACCESS_TOKEN, token);
      console.log("Store OK");
    }catch(e){
      console.log("Something went wrong store");
    }
  }
  getToken = async() =>{
    try{
      var token = await AsyncStorage.getItem(ACCESS_TOKEN);            
      console.log("token get is:" + token);
    }catch(e){
      console.log("Something went wrong get");
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
              var token = res.token;                      
              console.log("Response success is: " + token);
              this.storeToken(token); 
              this.getToken();
              this.props.navigation.navigate('MainScreen');
          } else {
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
            <Image
              style={{width: 197, height: 91, marginTop: 50,}}
              source = {require('../icons/LogoTMA.png')}
            />
            <Text style={styles.title}> 
            Lab monitoring
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
              autoCapitallize="none" 
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
    backgroundColor:'#fFffff'
  },
  login_mail:{
    flex: 7,
    flexDirection: 'column',
    backgroundColor:'#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title:{
    color: 'gray',
    fontWeight: "bold",
    flexDirection: 'row',
    marginTop: 40,
    textAlign: 'center',
    width: 300,
    fontSize: 30
  },
  textInputContainer:{
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  textInput: {
    width: 280,
    backgroundColor: '#f8f8ff',
    borderColor: '#708090',
    borderRadius: 6,
    borderWidth: 1,
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
export{ACCESS_TOKEN};
