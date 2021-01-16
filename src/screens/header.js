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
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class Headerscreen extends Component {
	render() {
    return (
    <View style={{
    	height: 60,
    	color: 'white',
    	flexDirection: 'row',
    	justifyContent: 'flex-start',
    	alignItems: 'center'
    }}>

      <TouchableHighlight style = {{marginRight: 10, marginTop: 30}}
      		onPress={() => {
      			const {navigate} = this.props.navigation;
      			navigate('DrawerOpen');
      		}}>
      		<Image
      			style={{width: 32, height: 32}}
      			source = {require('../icons/menu-icon.png')}
      		/>
      	</TouchableHighlight>
    </View>);
  }
}