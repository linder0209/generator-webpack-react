import {
  PERSON_REQUEST, PERSON_SUCCESS, PERSON_FAILURE, PERSON_CLEAN,
  PERSON_UPDATE, PERSON_DELETE
} from '../constants/PersonActionTypes';
import PersonSchemas from '../models/PersonSchemas';
import {CALL_API} from '../middleware/api';

function fetchPersonList(pageNo) {
  return {
    entity: 'personPagination',
    [CALL_API]: {
      types: [PERSON_REQUEST, PERSON_SUCCESS, PERSON_FAILURE],
      jsonUrl: `json/person/${pageNo}.json`,
      url: 'path/persons',
      options: {body: {pageNo}},
      schema: PersonSchemas.PERSON_LIST
    }
  };
}

//获取 person 分页列表
export function getPersonList() {
  return (dispatch, getState) => {
    const {
      pageNo = 1, //请求传递的页面
      isFetching,
      lastPage //最后一页
    } = getState().person.personPagination || {};
    if (isFetching || lastPage) {
      return null;
    }
    return dispatch(fetchPersonList(pageNo));
  };
}

//清空数据
export function cleanPersonList() {
  return {
    type: PERSON_CLEAN,
    entity: 'personPagination',
    clean: true
  }
}

//修改
export function updatePerson(person) {
  return {
    type: PERSON_UPDATE,
    person
  };
}

//删除
export function deletePerson(id) {
  return {
    type: PERSON_DELETE,
    id
  };
}

