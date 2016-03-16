import * as ActonTypes from '../constants/ActionTypes';

function listPerson(persons) {
  return {
    type: ActonTypes.PERSON_LIST,
    persons
  };
}

export function loadPerson(persons) {
  return (dispatch) => {
    setTimeout(() => {
      const persons = [{
        id: 1,
        name: '李四'
      }];
      dispatch(listPerson(persons));
    }, 3000);
  }
}
