import React, { PureComponent } from 'react';
import { Text, View, ScrollView } from 'react-native';

import SpyCombinationBox from './SpyCombinationBox';

export default class SpyDecode extends PureComponent {
  render() {
    const { currentTrail, trailSave, toggleSelected } = this.props;
    const { answers, grid } = currentTrail.finale;
    const userAnswers = trailSave.answers;

    const answerGrid = () => (
      <View style={{ flexDirection: 'column' }}>
        { answers.map((item, index) => answerLine(index, item.answer.length))}
      </View>
    );
    const answerLine = (clueNumber, length) => (
      <View style={Styles.answerLine} key={clueNumber}>
        <Text style={Styles.clueLine}>{ clueNumber + 1 }</Text>
        { generateAnswerBoxes(clueNumber, length) }
      </View>
    );

    const generateAnswerBoxes = (clueNumber, length) => {
      const { codeLetters } = answers[clueNumber];
      const boxes = [];
      for (let i = 0; i < length; i += 1) {
        if (codeLetters.includes(i)) {
          boxes.push(answerBoxes(clueNumber, i, Styles.gridBoxCode));
        } else {
          boxes.push(answerBoxes(clueNumber, i, Styles.gridBox));
        }
      }
      return boxes;
    };

    const answerBoxes = (clueNumber, charIndex, style) => {
      try {
        return (<Text style={style} key={charIndex}>{userAnswers[clueNumber][charIndex]}</Text>);
      } catch {
        return (
          <Text style={style} key={charIndex}> </Text>
        );
      }
    };

    return (
      <ScrollView style={{ flex: 1 }}>
        <Text style={Styles.title}>Mission Answer Grid</Text>
        { answerGrid() }
        <SpyCombinationBox
          decode={grid}
          direction="horizontal"
          userGrid={trailSave.userGrid}
          toggleSelected={toggleSelected}
        />
      </ScrollView>
    );
  }
}

const Styles = {
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  gridBox: {
    width: 22,
    borderColor: 'lightgrey',
    borderWidth: 2,
    textAlign: 'center',
    fontSize: 16
  },
  gridBoxCode: {
    width: 22,
    borderColor: 'lightgrey',
    borderWidth: 2,
    textAlign: 'center',
    backgroundColor: 'lightgrey',
    fontSize: 16
  },
  answerLine: {
    flexDirection: 'row',
    marginTop: 5
  },
  clueLine: {
    width: 25,
    textAlign: 'right',
    marginRight: 5,
    fontSize: 18
  }
};
