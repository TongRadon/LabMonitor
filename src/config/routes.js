import React from 'react';
import { View, Text, Dimensions, SafeAreaView, ListItem, List, Image} from 'react-native';
import { StackNavigator, NavigationActions, createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import Login from '../screens/login';
import Main from '../screens/main';
import DashBoard from '../screens/dashboard';
import Logout from '../screens/logout';
import Profile from '../screens/profile';
import {LoginScreen, MainScreen, LogoutScreen, ProfileScreen, DashBoardScreen} from '../screens/screenNames';
import { ScrollView } from 'react-native-gesture-handler';

const AppNavigator= createAppContainer(createStackNavigator(
    {
      LoginScreen: {
        screen: Login,
        navigationOptions: {
          headerTitle: 'Login'
        }
      },
      MainScreen: {
        screen: Main,
        navigationOptions: {
          headerShown: false
        }
      },
      DashBoardScreen: {
        screen: DashBoard,
        navigationOptions: {
          headerShown: false
        }
      },
    },
    {
      headerMode: 'screen',
    })
);
export default AppNavigator;