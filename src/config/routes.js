import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { StyleSheet } from 'react-native';
import Login from '../screens/login';
import Main from '../screens/main';
import DashBoard from '../screens/dashboard';
import Logout from '../screens/logout';
import Profile from '../screens/profile';
import {LoginScreen, MainScreen, LogoutScreen, ProfileScreen, DashBoardScreen} from '../screens/screenNames';

const Drawer = createAppContainer(createDrawerNavigator(
  {
    MainScreen:{ screen: Main},
    ProfileScreen:{ screen: Profile},
    LogoutScreen:{ screen: Logout}

  },
  {
    initialRouteName: "MainScreen",
    unmountInactiveRoutes: true,
    headerMode: "none",
    drawerOpenRouter: "DrawerOpen",
    drawerCloseRouter: "DrawerClose",
  }
))

const AppNavigator= createAppContainer(createStackNavigator(
  {
    LoginScreen: {
              screen: Login,
              navigationOptions: {
                headerTitle: 'Login'
              }
            },
    Drawer : {
              screen: Drawer,navigationOptions: {
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
    initialRouteName: "LoginScreen",
    headerMode: "none"
  }
))

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop:40,
    alignItems:"center",
    flex:1

  },
  listItem:{
      height:60,
      alignItems:"center",
      flexDirection:"row",
      color: 'green'
  },
  title:{
      fontSize:18,
      marginLeft:20,
      color: 'green'
  },
  header:{
    width:"100%",
    height:60,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20
  },
  profileImg:{
    width:80,
    height:80,
    borderRadius:40,
    marginTop:20
  },
  sidebarDivider:{
    height:1,
    width:"100%",
    backgroundColor:"lightgray",
    marginVertical:10
  }
});
