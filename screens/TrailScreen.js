import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import {
  Clue,
  End,
  ExInf,
  Movement,
  Start,
  HintModal
} from '../components/trailComponents';
import Button from '../components/Button';

import { SHOW_HINT_MODAL, CHANGE_STEP, SPY_TOGGLE_SELECTED } from '../constants/actionTypes';

const hintIcon = require('../assets/images/hintIcon.png');
const hintIconDisabled = require('../assets/images/hintIconDis.png');


class TrailScreen extends React.PureComponent {
  renderCurrentStep = () => {
    const {
      currentTrail,
      currentStep,
      theme,
      trailSave,
      spyToggleSelected,
      selectedTrail
    } = this.props;
    const step = currentTrail.trail[currentStep];
    let ansLength = null;
    let listType = null;
    switch (step.type) {
      case 'start': {
        return (<Start text={step.text} />);
      }
      case 'clue': {
        // console.log(currentTrail);
        if (theme === 'spy') { ansLength = currentTrail.finale.answers[step.clueNum].answer.length; }
        if (theme === 'murder') { listType = step.answerType; }
        return (
          <Clue
            text={step.text}
            clueNumber={step.clueNum}
            trailSave={trailSave}
            selectedTrail={selectedTrail}
            length={ansLength}
            step={step}
            listType={listType}
          />
        );
      }
      case 'movement': {
        return (
          <Movement
            text={step.text}
          />
        );
      }
      case 'exInf': {
        return (
          <ExInf
            text={step.text}
          />
        );
      }
      case 'end': {
        return (
          <End
            theme={theme}
            trailSave={trailSave}
            currentTrail={currentTrail}
            spyToggleSelected={spyToggleSelected}
          />
        );
      }
      default: {
        return (<Text>{`Error, step not found. Step: ${currentStep}`}</Text>);
      }
    }
  }

  initialiseStepHintsUsed = (step) => {
    const { hintsUsed } = this.state;
    if (!hintsUsed[step]) {
      this.setState((state) => {
        const prevHintsUsed = [...state.hintsUsed];
        prevHintsUsed[step] = 0;
        return { hintsUsed: prevHintsUsed };
      });
    }
  }

  initialiseStepMapUsed = (step) => {
    const { mapUsed } = this.state;
    if (!mapUsed[step]) {
      this.setState((state) => {
        const prevMapUsed = [...state.mapUsed];
        prevMapUsed[step] = 0;
        return { mapUsed: prevMapUsed };
      });
    }
  }

  initialiseStepAnswerUsed = (step) => {
    const { answerUsed } = this.state;
    if (!answerUsed[step]) {
      this.setState((state) => {
        const prevAnswerUsed = [...state.answerUsed];
        prevAnswerUsed[step] = 0;
        return { mapUsed: prevAnswerUsed };
      });
    }
  }

  renderShowModalButton = () => {
    const { showModal, currentTrail, currentStep } = this.props;
    const step = currentTrail.trail[currentStep];
    if (step.type === 'clue') {
      return (
        <TouchableOpacity onPress={() => showModal()}>
          <Image source={hintIcon} style={Styles.hintImage} />
        </TouchableOpacity>
      );
    } if (step.type === 'end') {
      return null;
    }
    return (
      <TouchableOpacity onPress={() => showModal()} disabled>
        <Image source={hintIconDisabled} style={Styles.hintImage} />
      </TouchableOpacity>
    );
  }

  render() {
    const {
      currentTrail,
      currentStep,
      changeStep,
      // state,
      // trailSave
    } = this.props;

    const leftDisabled = (currentStep === 0);
    const rightDisabled = (currentTrail.trail[currentStep].type === 'end');

    return (
      <SafeAreaView style={{ display: 'flex', flex: 1 }}>

        <View style={Styles.FlexRow}>
          <View style={Styles.LRButtons}>
            <Button
              disabled={leftDisabled}
              onPress={() => changeStep(-1)}
              title="<"
            />
          </View>
          <View style={Styles.Component}>
            {this.renderShowModalButton()}
            {this.renderCurrentStep()}
          </View>
          <View style={Styles.LRButtons}>
            <Button
              disabled={rightDisabled}
              onPress={() => changeStep(1)}
              title=">"
            />
          </View>
        </View>


        <HintModal />

        {/* <Button onPress={() => console.log(state)} title="dump state" /> */}
        {/* <Button onPress={
          () => console.log(JSON.stringify(trailSave))} title="dump save as string" /> */}
        {/* <Button
          onPress={() => changeStep(currentTrail.trail.length - currentStep - 1)}
          title="jump to end"
        /> */}

      </SafeAreaView>
    );
  }
}

TrailScreen.navigationOptions = {
  title: 'Trail',
};

const Styles = StyleSheet.create({
  FlexRow: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 5,
    flex: 1
  },
  Component: {
    marginHorizontal: 5,
    flexGrow: 1,
    flex: 1
  },
  LRButtons: {
    width: 30,
    height: 80,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  hintImage: {
    width: 40,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 2,
    borderColor: 'lightgrey',
  }
});

const mapStateToProps = (state, ownProps) => {
  const { trailState } = state;
  const {
    showHintModal,
    selectedTrail,
    trails,
    save,
    metaList,
    currentStep
  } = trailState;
  return {
    ...ownProps,
    theme: metaList[selectedTrail].theme,
    visible: showHintModal,
    state: trailState,
    selectedTrail,
    currentTrail: trails[selectedTrail],
    currentStep,
    trailSave: save[selectedTrail]
  };
};

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch({ type: SHOW_HINT_MODAL }),
  changeStep: direction => dispatch({ type: CHANGE_STEP, payload: direction }),
  spyToggleSelected: (lineNumber, gridIndex) => dispatch(
    { type: SPY_TOGGLE_SELECTED, payload: { lineNumber, gridIndex } }
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(TrailScreen);
