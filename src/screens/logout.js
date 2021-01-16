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
  TouchableHighlight
} from 'react-native';
import { StackNavigator, NavigationActions, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Headerscreen from './header';
const backgroundColor = '#0067a7';
export default class Logout extends Component {
    render() {
        return (<View style={{
            flex: 1,
            flexDirection: 'column',
        }}>      
            <Headerscreen {...this.props} />      
            <View style={{
                flex: 1,
                backgroundColor: backgroundColor,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
                    You make sure logout
                </Text>
                <TouchableHighlight style={{ 
                                            margin: 20, 
                                            width: 200, 
                                            height: 45,
                                            backgroundColor: '#b22222',
                                            padding: 10,
                                            alignItems: 'center',
                                         }}
                    onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate(Info);                                             
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}>Logout</Text>
                </TouchableHighlight>
            </View>
        </View>);
    }
}


