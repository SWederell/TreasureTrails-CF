import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import colours from '../../constants/colours';

export default class SpyCombinationBox extends PureComponent {
  render() {
    const {
      decode,
      direction,
      userGrid,
      toggleSelected
    } = this.props;

    const styleSwitch = (lineNumber) => {
      switch (lineNumber) {
        case 0: return { borderColor: colours.spyLine1, borderWidth: 2 };
        case 1: return { borderColor: colours.spyLine2, borderWidth: 2 };
        case 2: return { borderColor: colours.spyLine3, borderWidth: 2 };
        case 3: return { borderColor: colours.spyLine4, borderWidth: 2 };
        default: return null;
      }
    };

    const comboGrid = () => (
      <View style={(direction === 'vertical') ? Styles.gridV : Styles.gridH}>
        { decode.map((item, index) => gridLine(index))}
      </View>
    );
    const gridLine = lineNumber => (
      <View
        style={
          [
            (direction === 'vertical') ? Styles.gridLineV : Styles.gridLineH,
            styleSwitch(lineNumber)
          ]
        }
        key={lineNumber}
      >
        { generateAnswerBoxes(lineNumber) }
      </View>
    );

    const generateAnswerBoxes = (lineNumber) => {
      const boxes = [];
      for (let i = 0; i < 7; i += 1) {
        boxes.push(answerBoxes(lineNumber, i));
      }
      boxes.push(
        <Text style={Styles.gridBoxNoBorder} key="arrow">
          {(direction === 'vertical') ? 'v' : '>'}
        </Text>
      );
      boxes.push(
        <Text
          style={Styles.gridBox}
          key="box"
        >
          { (userGrid[lineNumber].filter(item => item === true).length === 6) ? findLetter(lineNumber) : ' ' }
        </Text>
      );
      return boxes;
    };

    const answerBoxes = (lineNumber, charIndex) => (
      <TouchableOpacity onPress={() => { toggleSelected(lineNumber, charIndex); }} key={charIndex}>
        <Text
          style={[Styles.gridBox, userGrid[lineNumber][charIndex] ? Styles.gridBoxSelected : null]}
        >
          {decode[lineNumber][charIndex]}
        </Text>
      </TouchableOpacity>
    );

    const findLetter = (line) => {
      const index = userGrid[line].findIndex(item => item === false);
      return decode[line][index];
    };

    return (
      <View style={Styles.container}>
        <Text style={Styles.title}>The Combination Box</Text>
        <View style={Styles.container}>
          { comboGrid() }
        </View>
      </View>
    );
  }
}

const Styles = {
  container: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    flex: 1
  },
  gridV: {
    flexDirection: 'row',
  },
  gridH: {
    flexDirection: 'column'
  },
  gridLineH: {
    flexDirection: 'row',
    marginBottom: 5
  },
  gridLineV: {
    flexDirection: 'column',
    marginRight: 5
  },
  gridBox: {
    width: 30,
    borderColor: 'lightgrey',
    borderWidth: 2,
    textAlign: 'center',
    fontSize: 18
  },
  gridBoxNoBorder: {
    width: 30,
    textAlign: 'center',
    fontSize: 18
  },
  gridBoxSelected: {
    backgroundColor: 'lightgrey'
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  }
};
