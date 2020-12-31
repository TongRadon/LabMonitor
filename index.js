/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import Login from './src/screens/login';
//import Main from './src/screens/main';

//import Blink from './components/auth/login';
import AppNavigator from './src/config/routes';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigator);
