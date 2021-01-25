import React, {Component} from 'react';
import { ImageBackground, View, Text, TouchableHighlight } from 'react-native';
import Headerscreen from './header';
const backgroundColor = '#0067a7';
export default class Profile extends Component {
    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Profile';
        let drawerIcon = () => (
            <ImageBackground
                source={require('../icons/profile_icon.png')}
                style={{ width: 26, height: 26, tintColor: backgroundColor }}
            />
        );
        return { drawerLabel, drawerIcon };
    }
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
                    This is Profile Screen
                </Text>
                <TouchableHighlight style={{ 
                                            margin: 20, 
                                            width: 200, 
                                            height: 45,
                                            backgroundColor: '#9acd32',
                                            padding: 10,
                                            alignItems: 'center',
                                         }}
                    onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate(Info);                                             
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}>Info</Text>
                </TouchableHighlight>
            </View>
        </View>);
    }
}


