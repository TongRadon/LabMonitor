/*import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import socketIOClient from 'socket.io-client';

const SOCKET_URL = 'http://103.199.7.185';


export default class Dashboard extends Component {
  constructor(props){
      super(props);
      this.socket = socketIOClient("http://localhost:3000",{jsonp:false});
      this.socket.emit('authenticate', "Thanh");
      this.socket.emit('authenticate', {
        token: "myAuthToken"
      });
      this.socket.on("server-send-data",function(data){
          console.log("client reicever data:" +data);
      })
  }  
  

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#0067a7',
  },
});*/

/*import React, { Component } from 'react';
//import IO from 'socket.io-client/dist/socket.io';
import AsyncStorage from '@react-native-community/async-storage';
const backgroundColor = '#0067a7';
import {
  Button,
  Alert,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
// import { socket } from '../data/socket';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://103.199.7.185";
const config = {path:'/'}
const socket = socketIOClient(ENDPOINT);

export default class Dashboard extends Component {
  // socket = null
	constructor(props) {

    console.log(socket)
    
    socket.on('connect', function () {
			socket.emit('authenticate', {
				token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwZjE5YTBjNTA4YTBlYzRkNmVmN2QiLCJpYXQiOjE2MTEwNDU3MTgsImV4cCI6MTYxMTEzMjExOH0.k3BuSg5kfP3oIovRMnpoCjwtBOkFPdFL-_niVzj1Cxs"
			});
		});

		socket.on('lab_monitor', () => {
			// console.log(socket);
    });
    
    socket.on('disconnected', ()=> {
      console.log("ws disconnected")
    })

		super(props);
		this.state = {
			zone: [
				{
					dps: [],
					temperature: "",
					humidity: "",
					pressure: "",
					lastUpdate: "",
					zoneLoad: true,
				},
				{
					dps: [],
					temperature: "",
					humidity: "",
					pressure: "",
					lastUpdate: "",
					zoneLoad: true,
				},
			],
		}
	}

	// componentDidMount() {
  //   console.log(socket,"dataa")

	// }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Button title = "pres" onPress={()=>{
    }}>
          </Button>
      </View>
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
  instructions:{
    color: 'white',
    flexDirection: 'row',
    textAlign: 'center',
    width: 500,
    fontSize: 40
  } 
})*/


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
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  Button,
  RefreshControl
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Headerscreen from './header';
import {MainScreen, DashBoardScreen} from '../screens/screenNames';
import { FlatList } from 'react-native-gesture-handler';
import {loadMessages} from '../data/get_data';
const backgroundColor = '#0067a7';

class FlatListItem extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'row'
            }}>
                
                <View style={{
                    flex: 1,
                    flexDirection:'column'
                }}>
                    <Text style={{
                        width: 280,
                        color: 'black',
                        fontSize: 20,
                        textAlign: 'left'
                    }}>{this.props.item.device_name}</Text>
                </View>
            </View>
        );
    }
}
export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          refreshing: false,
          labs_from_server: [],
          load: true
        }
      }
    componentDidMount() {
        this.refreshDataFromServer();
    }
    refreshDataFromServer = () => {
      loadMessages().then((labs) => {
            this.setState({ refreshing: true });
            this.setState({ labs_from_server: labs});
            this.setState({ refreshing: false });
        }).catch((error) => {
            console.log('error', error);
            this.setState({ refreshing: false });
        });
    }
    onRefresh = () => {
        this.refreshDataFromServer();
    }
    render() {
        return (<View style={{
            flex: 1,
            flexDirection: 'column',
        }}>      
            <View style={{
                flex: 1,
                backgroundColor: backgroundColor,
            }}>
                <FlatList
                    data={this.state.labs_from_server}
                    renderItem={({item, index})=>{
                        console.log(`Item = ${JSON.stringify(item)}, index = ${index}`)
                        return (
                            <Image
                            style={{width: 20, height: 20, margin: 5}}
                            source = {{uri: 'http://103.199.7.185/images/lab8.png'}}>
                            </Image>,
                            <TouchableOpacity style={{
                                width: 200,
                                height: 45,
                                borderRadius: 6,
                                marginTop: 20,
                                justifyContent:'center',
                                alignItems: 'center',
                                backgroundColor:'#3b5998',
                                flex: 80
                            }}
                            onPress={() => {this.props.navigation.navigate('DashBoardScreen')}}
                            >
                            <FlatListItem item={item} index={index}>
                            </FlatListItem>
                            
                            <Text style={{
                                width: 280,
                                color: 'white',
                                fontSize: 20,
                                textAlign: 'center'
                            }}>GOTO LAB</Text>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item,index)=>item._id}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                    >
                </FlatList>
            </View>
        </View>);
    }
}