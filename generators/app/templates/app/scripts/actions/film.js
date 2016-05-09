import * as FilmActionTypes from '../constants/FilmActionTypes';
import FilmSchemas from '../models/FilmSchemas';
import {CALL_API} from '../middleware/api';

const {
  ALL_FILM_REQUEST, ALL_FILM_SUCCESS, ALL_FILM_FAILURE, ALL_FILM_CLEAN,
  POPULARITY_FILM_REQUEST, POPULARITY_FILM_SUCCESS, POPULARITY_FILM_FAILURE, POPULARITY_FILM_CLEAN
} = FilmActionTypes;

/**
 * 以下 entity 中名称要与对应的 Schema 以及 reducer 中保持一致
 */
/*eslint-disable indent*/
function fetchFilmList(type = 'all') {
  switch (type) {
    case 'all':
      return {
        entity: 'allFilmList',
        [CALL_API]: {
          types: [ALL_FILM_REQUEST, ALL_FILM_SUCCESS, ALL_FILM_FAILURE],
          jsonUrl: 'json/film/all.json',
          url: 'path/film/all',
          schema: FilmSchemas.ALL_FILM_LIST,
          paging: false
        }
      };
    case 'popularity':
      return {
        entity: 'popularityFilmList',
        [CALL_API]: {
          types: [POPULARITY_FILM_REQUEST, POPULARITY_FILM_SUCCESS, POPULARITY_FILM_FAILURE],
          jsonUrl: 'json/film/popularity.json',
          url: 'path/film/popularity',
          schema: FilmSchemas.POPULARITY_FILM_LIST,
          paging: false
        }
      };
    default:
      return null;
  }
}

export function getFilmList(type) {
  return (dispatch, getState) => {
    return dispatch(fetchFilmList(type));
  };
}

//如果不传入 type 表示清空所有,否则根据传入的 type 来清空
export function cleanFilmList(type) {
  const types = ['all', 'popularity'];
  return (dispatch, getState) => {
    if (!type) {
      dispatch({
        type: ALL_FILM_CLEAN,
        entity: 'allFilmList',
        clean: true
      });
      dispatch({
        type: POPULARITY_FILM_CLEAN,
        entity: 'popularityFilmList',
        clean: true
      });
    } else {
      dispatch({
        type: FilmActionTypes[`${type.toUpperCase()}_FILM_CLEAN`],
        entity: `${type.toUpperCase()}FilmList`,
        clean: true
      });
    }
  };
}
