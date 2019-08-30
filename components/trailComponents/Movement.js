import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

export default class Movement extends PureComponent {
  render() {
    const { text } = this.props;
    return (
      <View style={Styles.container}>
        <Text style={Styles.text}>{text}</Text>
      </View>
    );
  }
}

const Styles = {
  container: {
    width: 300,
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  text: {
    fontSize: 16
  }
};
