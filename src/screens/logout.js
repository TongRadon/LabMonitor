import React, {Component} from 'react';
import { View, Text, ImageBackground,TouchableOpacity} from 'react-native';
import Headerscreen from './header';
import {LoginScreen, MainScreen} from '../screens/screenNames';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './login';
export default class Logout extends Component {
    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Logout';
        let drawerIcon = () => (
            <ImageBackground
                source={require('../icons/logout_icon.png')}
                style={{ width: 26, height: 26, tintColor: "blue" }}
            />
        );
        return { drawerLabel, drawerIcon };
    }
    clearToken = async () => {
        let token = await AsyncStorage.removeItem('access_token');;
        if (token == null) {
            this.props.navigation.navigate('LoginScreen'); 
        }else {
            alert('Logout ERROR');
        }
    }

    render() {
        return (<View style={{
            flex: 1,
            flexDirection: 'column',
        }}>
            <Headerscreen {...this.props} />
            <View style={{
                flex: 1,
                backgroundColor: '#fFffff',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Text style={{
                color: 'gray',
                fontWeight: "bold",
                flexDirection: 'row',
                marginTop: 40,
                textAlign: 'center',
                width: 300,
                fontSize: 20
            }}>Do you make sure Logout?</Text>
            <TouchableOpacity 
            style={{
                width: 300,
                height: 45,
                borderRadius: 6,
                marginTop: 20,
                justifyContent:'center',
                alignItems: 'center',
                backgroundColor:'#3b5998'
              }}
            onPress={this.clearToken.bind(this)}
            >
            <Text style={{
                width: 280,
                color: 'white',
                fontSize: 20,
                textAlign: 'center'
            }}>LOGOUT</Text>
            </TouchableOpacity>                             
            </View>
        </View>);
    }
}

