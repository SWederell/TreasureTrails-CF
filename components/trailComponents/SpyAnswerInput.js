import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';

export default class SpyAnswerInput extends PureComponent {
  render() {
    const {
      value,
      onChange,
      clueNum,
      length,
      answers
    } = this.props;
    return (
      <TextInput
        style={Styles.input}
        placeholder="answer"
        onChangeText={text => onChange(text, clueNum)}
        value={value}
        autoCapitalize="characters"
        autoCompleteType="off"
        autoCorrect={false}
        autoFocus
        maxLength={length}
        keyboardType={answers[clueNum].keyboardType}
      />
    );
  }
}

const Styles = {
  input: {
    height: 40,
    marginTop: 20,
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 1
  }
};
