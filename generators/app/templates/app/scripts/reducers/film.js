import {combineReducers} from 'redux';
import paginate from './paginate';
import * as FilmActionTypes from '../constants/FilmActionTypes';

const {
  ALL_FILM_REQUEST, ALL_FILM_SUCCESS, ALL_FILM_FAILURE, ALL_FILM_CLEAN,
  POPULARITY_FILM_REQUEST, POPULARITY_FILM_SUCCESS, POPULARITY_FILM_FAILURE, POPULARITY_FILM_CLEAN
} = FilmActionTypes;

const film = combineReducers({
  allFilmList: paginate({
    types: [ALL_FILM_REQUEST, ALL_FILM_SUCCESS, ALL_FILM_FAILURE],
    cleanType: ALL_FILM_CLEAN,
    paging: false
  }),
  popularityFilmList: paginate({
    types: [POPULARITY_FILM_REQUEST, POPULARITY_FILM_SUCCESS, POPULARITY_FILM_FAILURE],
    cleanType: POPULARITY_FILM_CLEAN,
    paging: false
  })
});

export default film;
