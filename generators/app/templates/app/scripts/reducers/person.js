import {combineReducers} from 'redux';
import paginate from './paginate';
import assign from 'lodash/assign';
import * as PersonActionTypes from '../constants/PersonActionTypes';

const {
  PERSON_REQUEST, PERSON_SUCCESS, PERSON_FAILURE, PERSON_CLEAN, PERSON_UPDATE, PERSON_DELETE
} = PersonActionTypes;

/**
 * customTypes 根据实际业务需求自定义 reducer
 */
const person = combineReducers({
  personPagination: paginate({
    types: [PERSON_REQUEST, PERSON_SUCCESS, PERSON_FAILURE],
    cleanType: PERSON_CLEAN,
    customTypes: {
      [PERSON_UPDATE]: (state, action) => {
        let {ids, entity} = state;
        const _entity = assign({}, entity);
        _entity[action.person.id] = assign({}, action.person, action.person);

        const _state = assign({}, state, {
          ids: assign([], ids),
          entity
        });
        return _state;
      },
      [PERSON_DELETE]: (state, action) => {
        let {ids, entity} = state;
        const _entity = assign({}, entity);
        delete _entity[action.id];

        const _state = assign({}, state, {
          ids: ids.filter((person) => person !== action.id),
          entity: _entity
        });
        return _state;
      }
    }
  })
});

export default person;
