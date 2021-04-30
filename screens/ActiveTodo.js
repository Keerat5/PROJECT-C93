import React from 'react';
import { Text, View } from 'react-native';
import MyHeader from "../components/MyHeader";

export default class ActiveTodo extends React.Component {
    render() {
      return (
        <View style={{ flex: 0.1 }}>
            <MyHeader title="Active Todo's" navigation={this.props.navigation} />
        </View>
      );
    }
  }