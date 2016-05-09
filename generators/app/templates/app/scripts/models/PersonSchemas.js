import {Schema, arrayOf} from 'normalizr';

const personSchema = new Schema('personPagination');

export default {
  PERSON_LIST: arrayOf(personSchema)
};
