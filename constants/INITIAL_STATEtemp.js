const metaList = require('../assets/data/metalist.json');
const Rugby = require('../assets/data/rugby-centre.json');
const Kenilworth = require('../assets/data/kenilworth.json');
const Braunston = require('../assets/data/braunston.json');


const INITIAL_STATE = {
  trailState: {
    showHintModal: false,
    selectedTrail: '',
    sortIndex: 0,
    metaList,
    trails: {
      'rugby-centre': Rugby,
      kenilworth: Kenilworth,
      braunston: Braunston
    },
    save: {
      'rugby-centre': {
        currentStep: 40,
        step: [
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false },
          { hintsUsed: 0, mapUsed: false, answerUsed: false }
        ],
        answers: [
          'MARKET',
          'JOHNMCKENNA',
          'TAXI',
          'MANOR',
          'ASTRONOMER',
          '1869',
          'TURNER',
          '134',
          '1885',
          'LABORANDO',
          'WHOSE',
          'PRINTER',
          'QWERTP',
          'ELIZAPENN',
          'FOURTEEN',
          'OWL',
          'LEAMINGTON',
          '36',
          'TOILETS',
          '1914',
          'HILARY',
          'DECORATIVE',
          'SEVEN'
        ],
        userGrid: [
          [false, false, false, true, false, false, true],
          [false, false, true, false, false, false, true],
          [false, true, false, true, false, false, false],
          [false, false, false, true, true, false, true]
        ],
      }
    }
  }
};

export default INITIAL_STATE;
