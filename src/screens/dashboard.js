import React, {Component} from 'react';
import {socket} from '../data/get_data';
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
import { FlatList } from 'react-native-gesture-handler';
import {onLoadLabs} from '../data/get_data';
import IO from 'socket.io-client/dist/socket.io.js';
const backgroundColor = '#0067a7';
const ENDPOINT = "http://103.199.7.185";

export default class DashBoard extends Component {
    constructor(props) {
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
  
    componentDidMount() {
      const socket = IO(`${ENDPOINT}`, {
        forceNew: true,
      });
      socket.on('connection', () => console.log('Connection'));
  
    }
  
    render() {
      var { zone } = this.state;
      return (<View style={{
            flex: 1,
            flexDirection: 'column',
        }}>      
            <Headerscreen {...this.props} />      
            <View style={{
                flex: 1,
                backgroundColor: backgroundColor,
            }}>
                <FlatList
                    data={this.state.labs_detail}
                    renderItem={({item, index})=>{
                        console.log(`Item detail = ${JSON.stringify(item)}, index = ${index}`)
                    }}
                    keyExtractor={(item,index)=>item._id}
                    >
                </FlatList>
            </View>
        </View>);
    }
}