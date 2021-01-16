/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppNavigator from './src/config/routes';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigator);
