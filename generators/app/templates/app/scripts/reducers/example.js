import {combineReducers} from 'redux';
import {SWITCH_TAB} from '../constants/ExampleActionTypes';

/*eslint-disable indent*/
function activeTab(state = '/', action) {
  switch (action.type) {
    case SWITCH_TAB:
      return action.tab;
    default:
      return state;
  }
}

const example = combineReducers({
  activeTab
});

export default example;
