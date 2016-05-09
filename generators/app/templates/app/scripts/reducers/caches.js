import assign from 'lodash/assign';
import * as CacheActionType from '../constants/CacheActionTypes';

/*eslint-disable indent*/
export default function caches(state = {}, action) {
  switch (action.type) {
    case CacheActionType.ADD_CACHE:
      return assign({}, state, {[action.cacheId]: action.value === undefined ? true : action.value});
    case CacheActionType.RESET_CACHE:
    {
      const _state = assign({}, state);
      delete _state[action.cacheId];
      return _state;
    }
    case CacheActionType.RESET_ALL_CACHE:
      return {};
    default:
      return state;
  }
}
