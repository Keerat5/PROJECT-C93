import React from 'react';
import WelcomeScreen from './screens/WelcomeScreen'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {AppTabNavigator} from './components/AppTabNavigator'
import {AppDrawerNavigator} from './components/AppDrawerNavigator'


export default function App() {
  return (
    <AppContainer/>   
  );
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  Drawer: {screen: AppDrawerNavigator},
  BottomTab: {screen: AppTabNavigator},
})

const AppContainer =  createAppContainer(switchNavigator);
