import {Schema, arrayOf} from 'normalizr';

// Read more about Normalizr: https://github.com/gaearon/normalizr
// 这里的 Schema 名称应该跟 action 中属性 entity 对应上
// 默认主键名为 id, 也可以用 idAttribute 来改变主键名
/**
 const allFilmSchema = new Schema('allFilmList', {
  idAttribute: 'name'
 });
 */
const allFilmSchema = new Schema('allFilmList');
const popularityFilmSchema = new Schema('popularityFilmList');

export default {
  ALL_FILM_LIST: arrayOf(allFilmSchema),
  POPULARITY_FILM_LIST: arrayOf(popularityFilmSchema)
};
