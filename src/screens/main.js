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
import DashBoard from './dashboard';
import { FlatList } from 'react-native-gesture-handler';
import {onLoadLabs} from '../data/get_listlab';
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
export default class Main extends Component {
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
        onLoadLabs().then((labs) => {
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
            <Headerscreen {...this.props} />      
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


