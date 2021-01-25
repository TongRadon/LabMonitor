import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, RefreshControl,StyleSheet} from 'react-native';
import Headerscreen from './header';
import {MainScreen, DashBoardScreen} from '../screens/screenNames';
import DashBoard from './dashboard';
import { FlatList } from 'react-native-gesture-handler';
import {onLoadLabs} from '../data/get_listlab';
const backgroundColor = '#0067a7';

function FlatListItem({ item, navigate}) {
    return (
      <View style={styles.listItem}>
        <Image source = {{uri: 'http://103.199.7.185/images/lab8.png'}}  style={{width:60, height:60,borderRadius:30}} />
        <View style={{alignItems:"center",flex:1}}>
          <Text style={{fontWeight:"bold",margin:20,justifyContent:"center",alignItems:"center"}}>{item.device_name}</Text>
        </View>
        <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}
            onPress={()=>navigate('DashBoardScreen')}>
          <Text style={{color:"green"}}>View</Text>
        </TouchableOpacity>
      </View>
    );
  }

export default class Main extends Component {
    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Home';
        let drawerIcon = () => (
            <ImageBackground
                source={require('../icons/home_icon.png')}
                style={{ width: 26, height: 26, tintColor: backgroundColor }}
            />
        );
        return { drawerLabel, drawerIcon };
    }
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

render(){
    return (
         
      <View style={styles.container}>
        <Headerscreen {...this.props} />
        <FlatList
          style={{flex:1}}
          data={this.state.labs_from_server}
          
          renderItem={({ item }) => <FlatListItem item={item} navigate={this.props.navigation.navigate}/>}
          keyExtractor={(item,index)=>item._id}
          refreshControl={
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
            />
            }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F7F7',
    },
    listItem:{
      margin:10,
      padding:10,
      backgroundColor:"#FFF",
      width:"80%",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5
    }
  });


