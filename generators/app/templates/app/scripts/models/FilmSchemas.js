import {Schema, arrayOf} from 'normalizr';

const allFilmSchema = new Schema('allFilmList');
const popularityFilmSchema = new Schema('popularityFilmList');

export default {
  ALL_FILM_LIST: arrayOf(allFilmSchema),
  POPULARITY_FILM_LIST: arrayOf(popularityFilmSchema)
};
