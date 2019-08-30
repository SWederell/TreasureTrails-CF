import { combineReducers } from 'redux';

import trailReducer from './trailReducer';

const Reducer = combineReducers({
  trailState: trailReducer
});

export default Reducer;
