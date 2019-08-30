import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Button,
  Linking,
  Image
} from 'react-native';
import { connect } from 'react-redux';

import MurderSuspectList from './MurderSuspectList';
import SpyAnswerInput from './SpyAnswerInput';
import TreasureMap from './TreasureMap';


import { UPDATE_ANSWER_VALUE, MURDER_TOGGLE_SELECTED } from '../../constants/actionTypes';

class Clue extends PureComponent {
  renderAnswerInput = () => {
    const {
      trail,
      length,
      updateAnswer,
      saveAnswers,
      clueNumber,
      currentTrail,
      murderToggleAnswer,
      listType,
      trailSave,
    } = this.props;
    const { theme } = trail;
    const { answers } = currentTrail.finale;
    switch (theme) {
      case 'spy': return <SpyAnswerInput answerLength={answers[clueNumber].answer.length} onChange={updateAnswer} value={saveAnswers[clueNumber]} clueNum={clueNumber} length={length} answers={answers} />;
      case 'murder': return <MurderSuspectList toggleSelected={murderToggleAnswer} answers={answers} listType={listType} trailSave={trailSave} />;
      case 'treasure': return <TreasureMap />;
      default: return null;
    }
  }

  formatText = () => {
    const { trail, text, length } = this.props;
    const { theme } = trail;
    if (theme === 'spy') {
      return `${text} (${length})`;
    }
    return `${text}`;
  }

  renderImage = () => {
    const { step } = this.props;
    if ('image' in step) {
      const { image } = step;
      const imageURI = `data:image/png;base64,${image.data}`;
      const imageScaler = 2.5;
      return (
        <Image
          style={{
            height: (image.height) * imageScaler,
            width: (image.width) * imageScaler,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10
          }}
          source={{ uri: imageURI }}
        />
      );
    }
    return null;
  }

  renderFeedbackButton = () => {
    const { trailSave, clueNumber, selectedTrail } = this.props;
    if (trailSave.step[clueNumber].answerUsed) {
      return (
        <Button
          onPress={() => Linking.openURL(`mailto:email@example.co.uk?subject=Report Problem with clue&body=Please do not modify the following:\nTrail: "${selectedTrail}"\nClue Number:"${clueNumber}"\n-----------------------------------\n\nIn your own words, please describe below what the problem is:\n`)}
          title="Report problem with clue"
        />
      );
    }
    return null;
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.text}>{this.formatText()}</Text>

        {this.renderImage()}

        {this.renderAnswerInput()}
        {this.renderFeedbackButton()}
      </View>
    );
  }
}

const Styles = {
  container: {
    width: 300,
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    flex: 1
  },
  text: {
    fontSize: 16
  }
};

const mapStateToProps = (state, ownProps) => {
  const {
    selectedTrail,
    metaList,
    trails,
    save,
  } = state.trailState;
  const currentTrail = trails[selectedTrail];

  return {
    ...ownProps,
    trail: metaList[selectedTrail],
    currentTrail,
    trailSave: save[selectedTrail],
    saveAnswers: save[selectedTrail].answers
  };
};

const mapDispatchToProps = dispatch => ({
  updateAnswer: (value, clue) => dispatch({ type: UPDATE_ANSWER_VALUE, payload: { value, clue } }),
  murderToggleAnswer: (type, id) => dispatch({
    type: MURDER_TOGGLE_SELECTED,
    payload: { type, id }
  })
});


export default connect(mapStateToProps, mapDispatchToProps)(Clue);
