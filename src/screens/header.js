import React, {Component} from 'react';
import {View, TouchableHighlight, Image, StyleSheet,TouchableOpacity,Text} from 'react-native';

export default class Headerscreen extends Component {
	render() {
    return (
    <View style={{
    	width:"100%",
      height:48,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      paddingHorizontal:20
    }}>
    <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
    <Image
       			style={{width: 32, height: 32}}
       			source = {require('../icons/menu_icon.png')}
       		/>
    </TouchableOpacity>
    <Text>TMA-LAB</Text>
    <Text style={{width:50}}></Text>
    </View>);
  }
}