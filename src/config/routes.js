import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, NavigationActions, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import Login from '../screens/login';
import Main from '../screens/main';
import {LoginScreen, MainScreen} from '../screens/screenNames';
const styles = StyleSheet.create({
      header: {
        backgroundColor: 'transparent',
        position: 'absolute',
        height: 50
      },
  });

const AppNavigator = createAppContainer(createStackNavigator(
    {
      LoginScreen: {
        screen: Login,
        navigationOptions: {
          headerTitle: 'Login'
        }
      },
      MainScreen: {
        screen: Main
      },
    },
    {
      headerMode: 'screen',
    })
);

export default AppNavigator;