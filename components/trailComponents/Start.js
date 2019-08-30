import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class Start extends PureComponent {
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


export default connect()(Start);
