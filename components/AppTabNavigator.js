import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ActiveTodo from '../screens/ActiveTodo';
import AddTodo from '../screens/AddTodo';
import CompletedTodo from '../screens/CompletedTodo';

export const AppTabNavigator = createBottomTabNavigator({
  ActiveTodo : {
    screen: ActiveTodo,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/addTodo.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "ActiveTodo",
    }
  },
  AddTodo: {
    screen: AddTodo,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/addTodo.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "AddTodo",
    }
  },
  CompletedTodo : {
    screen: CompletedTodo,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/completedTodo.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Completed Todo",
    }
  },
});
