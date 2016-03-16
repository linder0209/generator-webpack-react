import * as ActionTypes from '../constants/ActionTypes';

/*eslint-disable indent*/
export default function loginDataReducer(state = [{
  id: 1,
  name: '张三'
}], action) {
  switch (action.type) {
    case ActionTypes.PERSON_LIST:
      return action.persons;
    default:
      return state;
  }
}