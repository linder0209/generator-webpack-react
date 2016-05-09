import * as ExamplesActionTypes from '../constants/ExampleActionTypes';

//切换标签
export function switchTab(tab) {
  return {
    type: ExamplesActionTypes.SWITCH_TAB,
    tab
  };
}
