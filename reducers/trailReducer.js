import {
  SHOW_HINT_MODAL,
  HIDE_HINT_MODAL,
  CHANGE_SELECTED_TRAIL,
  INITIALISE_TRAIL_SAVE,
  CHANGE_STEP,
  HINT_USED,
  MAP_USED,
  ANSWER_USED,
  CHANGE_SORT,
  UPDATE_ANSWER_VALUE,
  SPY_TOGGLE_SELECTED,
  MURDER_TOGGLE_SELECTED
} from '../constants/actionTypes';

export default function trailReducer(state = null, action) {
  console.log('reducer called');
  // console.log(action);
  switch (action.type) {
    case SHOW_HINT_MODAL: return ({ ...state, showHintModal: true });
    case HIDE_HINT_MODAL: return ({ ...state, showHintModal: false });
    case CHANGE_SELECTED_TRAIL: return ({ ...state, selectedTrail: action.payload });
    case INITIALISE_TRAIL_SAVE: return initialiseTrailSave(state);
    case CHANGE_STEP: return changeStep(state, action.payload);
    case HINT_USED: return increaseHintsUsed(state);
    case MAP_USED: return useMap(state);
    case ANSWER_USED: return useAnswer(state);
    case CHANGE_SORT: return ({ ...state, sortIndex: action.payload });
    case UPDATE_ANSWER_VALUE: return updateAnswerValue(state, action.payload);
    case SPY_TOGGLE_SELECTED: return toggleSpyGridSelected(state, action.payload);
    case MURDER_TOGGLE_SELECTED: return toggleMurderSelected(state, action.payload);
    default: return state;
  }
}

const initialiseTrailSave = (state) => {
  const { selectedTrail, metaList, trails } = state;
  if (!(selectedTrail in state.save)) {
    const stepArray = [];
    const answersArray = [];
    let userGrid = [];
    if (metaList[selectedTrail].theme === 'spy') {
      userGrid = [
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false]];
    }
    const suspects = [];
    const weapons = [];
    if (metaList[selectedTrail].theme === 'murder') {
      for (let i = 0; i < trails[selectedTrail].finale.answers.suspects.length; i += 1) {
        suspects.push(false);
      }
      for (let i = 0; i < trails[selectedTrail].finale.answers.weapons.length; i += 1) {
        weapons.push(false);
      }
    }

    const newStep = {
      hintsUsed: 0,
      mapUsed: false,
      answerUsed: false,
    };

    state.trails[selectedTrail].trail.map((item) => {
      if (item.type === 'clue') {
        stepArray.push(newStep);
        answersArray.push('');
      }
      return null;
    });
    return ({
      ...state,
      currentStep: 0,
      save: {
        ...state.save,
        [selectedTrail]: {
          currentStep: 0,
          step: stepArray,
          answers: answersArray,
          userGrid,
          suspects,
          weapons
        }
      }
    });
  } return {
    ...state,
    currentStep: state.save[selectedTrail].currentStep
  };
};

const changeStep = (state, payload) => {
  const { selectedTrail, save } = state;
  let newStep = save[selectedTrail].currentStep;
  newStep += payload;
  return ({
    ...state,
    currentStep: newStep,
    save: {
      ...state.save,
      [selectedTrail]: {
        ...state.save[selectedTrail],
        currentStep: newStep
      }
    }
  });
};

const increaseHintsUsed = (state) => {
  const {
    selectedTrail,
    save,
    currentStep,
    trails
  } = state;
  const trailSave = save[selectedTrail];
  const currentTrail = trails[selectedTrail];
  const newStep = trailSave.step.map((item, index) => {
    if (index !== currentTrail.trail[currentStep].clueNum) {
      return item;
    }
    return {
      ...item,
      hintsUsed: item.hintsUsed + 1
    };
  });
  return ({
    ...state,
    save: {
      ...save,
      [selectedTrail]: {
        ...save[selectedTrail],
        step: newStep
      }
    }
  });
};

const useMap = (state) => {
  const {
    selectedTrail,
    save,
    currentStep,
    trails
  } = state;
  const trailSave = save[selectedTrail];
  const currentTrail = trails[selectedTrail];
  const newStep = trailSave.step.map((item, index) => {
    if (index !== currentTrail.trail[currentStep].clueNum) {
      return item;
    }
    return {
      ...item,
      mapUsed: true
    };
  });
  return ({
    ...state,
    save: {
      ...save,
      [selectedTrail]: {
        ...save[selectedTrail],
        step: newStep
      }
    }
  });
};

const useAnswer = (state) => {
  const {
    selectedTrail,
    save,
    currentStep,
    trails
  } = state;
  const trailSave = save[selectedTrail];
  const currentTrail = trails[selectedTrail];
  const newStep = trailSave.step.map((item, index) => {
    if (index !== currentTrail.trail[currentStep].clueNum) {
      return item;
    }
    return {
      ...item,
      answerUsed: true
    };
  });
  return ({
    ...state,
    save: {
      ...save,
      [selectedTrail]: {
        ...save[selectedTrail],
        step: newStep
      }
    }
  });
};

const updateAnswerValue = (state, payload) => {
  const { value, clue } = payload;
  const { selectedTrail, save } = state;
  const trailSave = save[selectedTrail];

  const newAnswers = trailSave.answers.map((item, index) => {
    if (index !== clue) {
      return item;
    }
    return value;
  });
  return ({
    ...state,
    save: {
      ...save,
      [selectedTrail]: {
        ...save[selectedTrail],
        answers: newAnswers
      }
    }
  });
};

const toggleSpyGridSelected = (state, payload) => {
  const { selectedTrail, save } = state;
  const trailSave = save[selectedTrail];
  const { lineNumber, gridIndex } = payload;

  const newLine = trailSave.userGrid.map((item, index) => {
    if (index === lineNumber) {
      const newIndex = item.map((indexItem, indexIndex) => {
        if (indexIndex === gridIndex) {
          return !trailSave.userGrid[lineNumber][gridIndex];
        }
        return indexItem;
      });
      return newIndex;
    }
    return item;
  });

  return ({
    ...state,
    save: {
      ...save,
      [selectedTrail]: {
        ...save[selectedTrail],
        userGrid: newLine
      }
    }
  });
};

const toggleMurderSelected = (state, payload) => {
  const { type, id } = payload;
  const { selectedTrail, save } = state;
  const trailSave = save[selectedTrail];

  const newToggle = trailSave[type].map((item, index) => {
    if (index !== id) {
      return item;
    }
    return !trailSave[type][id];
  });
  return ({
    ...state,
    save: {
      ...save,
      [selectedTrail]: {
        ...save[selectedTrail],
        [type]: newToggle
      }
    }
  });
};
