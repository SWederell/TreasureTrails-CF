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
    save: {}
  }
};

export default INITIAL_STATE;
