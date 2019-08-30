import React, { PureComponent, Fragment } from 'react';
import { Button, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import Overlay from 'react-native-modal-overlay';

import {
  HIDE_HINT_MODAL,
  HINT_USED,
  MAP_USED,
  ANSWER_USED
} from '../../constants/actionTypes';

const hints = ['hint 1', 'hint 2', 'hint 3'];
const map = require('../../assets/images/maps/place_holder.jpg');

class HintModal extends PureComponent {
  renderHintButton = () => {
    const { hintsUsed, useHint } = this.props;
    if (hintsUsed <= 2) {
      return <Button onPress={() => useHint()} title={`Show Hint ${hintsUsed + 1}`} />;
    }
    return (null);
  }

  renderHints = (hintNumber) => {
    const { hintsUsed } = this.props;
    if (hintsUsed >= hintNumber) {
      return (
        <Text>{hints[hintNumber - 1]}</Text>
      );
    }
    return null;
  }

  renderMapButton = () => {
    const { mapUsed, useMap } = this.props;
    if (!mapUsed) {
      return (
        <Button onPress={() => useMap()} title="Show Map" />
      );
    }
    return null;
  }

  renderMap = () => {
    const { mapUsed } = this.props;
    if (mapUsed) {
      return (
        <Image source={map} />
      );
    }
    return null;
  }

  renderAnswerButton = () => {
    const {
      currentTrail,
      hintsUsed,
      mapUsed,
      currentStep,
      answerUsed,
      useAnswer
    } = this.props;
    const stepType = currentTrail.trail[currentStep].type;
    if (mapUsed && hintsUsed === 3 && stepType === 'clue' && !answerUsed) {
      return (
        <Button onPress={() => useAnswer()} title="Show Answer" />
      );
    }
    return null;
  }

  renderAnswer = () => {
    const { answerUsed, currentStep, currentTrail } = this.props;
    if (answerUsed) {
      const { trail, finale } = currentTrail;
      const step = trail[currentStep];
      const answers = finale.answers[step.clueNum];
      return (
        <Text>{answers.answer}</Text>
      );
    }
    return null;
  }

  render() {
    const {
      visible,
      hideHintModal,
    } = this.props;

    return (
      <Overlay
        visible={visible}
        onClose={() => hideHintModal()}
        closeOnTouchOutside
        animationType="zoomIn"
        containerStyle={{ backgroundColor: 'rgba(37, 8, 10, 0.78)' }}
        childrenWrapperStyle={{ backgroundColor: '#eee' }}
        animationDuration={500}
      >
        {
          hideModal => (
            <Fragment>
              {this.renderHints(1)}
              {this.renderHints(2)}
              {this.renderHints(3)}
              {this.renderHintButton()}
              {this.renderMap()}
              {this.renderMapButton()}
              {this.renderAnswerButton()}
              {this.renderAnswer()}
              <Text onPress={hideModal}>Close</Text>
            </Fragment>
          )
        }
      </Overlay>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    selectedTrail,
    showHintModal,
    save,
    trails,
    currentStep
  } = state.trailState;
  const { step } = save[selectedTrail];
  const currentTrail = trails[selectedTrail];
  const currentTrailStep = currentTrail.trail[currentStep];
  if (currentTrailStep.type === 'clue') {
    const { clueNum } = currentTrailStep;
    const { hintsUsed, mapUsed, answerUsed } = step[clueNum];
    return ({
      ...ownProps,
      visible: showHintModal,
      currentTrail,
      state,
      currentStep,
      hintsUsed,
      mapUsed,
      answerUsed,
      clueNum
    });
  }
  return ({
    ...ownProps,
    visible: showHintModal,
    currentTrail,
    state,
    currentStep,
  });
};

const mapDispatchToProps = dispatch => ({
  hideHintModal: () => dispatch({ type: HIDE_HINT_MODAL }),
  useHint: () => dispatch({ type: HINT_USED }),
  useMap: () => dispatch({ type: MAP_USED }),
  useAnswer: () => dispatch({ type: ANSWER_USED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HintModal);
