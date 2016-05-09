/*
 * 分页或列表中间件,默认为分页
 */

// JSON 数据范式化
import {normalize} from 'normalizr';
// 驼峰命名和下划线命名之间转换
import {camelizeKeys} from 'humps';
import assign from 'lodash/assign';
import callApi from '../fetch';
import errorHandler from '../utils/errorHandler';

// Action key that carries API call info interpreted by this Redux middleware.
// 看阮老师的博客 http://es6.ruanyifeng.com/#docs/symbol
// 用 Symbol 来标示独一无二的属性值，FIXME 有兼容行问题，目前先用常量代替
//export const CALL_API = Symbol('Call API');
export const CALL_API = 'CALL_API';


// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  /**
   * callAPI 值类似
   *
   [CALL_API]: {
      types: [ALL_FILM_REQUEST, ALL_FILM_SUCCESS, ALL_FILM_FAILURE],
      jsonUrl: 'json/film/all.json',
      url: 'path/film/all',
      schema: FilmSchemas.ALL_FILM_LIST,
      paging: false
    }
   */
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let {url} = callAPI;
  //paging 为 true 指分页,默认为 true
  const {schema, types, options, paging = true, jsonUrl} = callAPI;

  if (typeof url === 'function') {
    url = url(store.getState());
  }

  if (typeof url !== 'string') {
    throw new Error('url 必须是 string 类型');
  }
  if (!schema) {
    throw new Error('schema 不能为空');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('传入的 types 必须是 Array，并且长度等于 3');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('action type 必须是 string 类型');
  }
  if (options && typeof options !== 'object') {
    throw new Error('options 必须是 object 类型');
  }

  // 分别执行发送请求，成功或失败请求
  function actionWith(data) {
    // 注意这里，返回最终的 action 供 reducer 中使用，即 reducer 中拿到的 action 是从这里取到的
    const finalAction = assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;

  // 先发送请求
  next(actionWith({type: requestType}));

  // Fetch 一个请求，并返回结果, 返回成功处理逻辑需要根据后端返回的数据格式来解析
  return callApi({url, options, jsonUrl}).then(
    ({json, response}) => {
      let res;
      let data = json.data;
      if (!data) {
        data = {};
      }
      //把对象或数组转换为驼峰式
      const camelizedJson = camelizeKeys(data);
      const {currentPage, totalPage, totalCount} = camelizedJson;
      // 用 normalize 把结果格式为标准的 Schema
      //用 normalize 序列号处理
      res = assign({},
        normalize(paging ? (camelizedJson.list || []) : camelizedJson, schema),
        paging ? {currentPage, totalPage, totalCount, lastPage: currentPage >= totalPage} : {}
      );

      //调用成功 action，并把结果数据返回
      return next(actionWith({
        res,
        type: successType
      }));

      //如果想演示加载效果,可以延迟2秒处理数据
      /*setTimeout(() => {
       return next(actionWith({
       res,
       type: successType
       }));
       }, 2000);*/
    },
    (error) => {
      const message = errorHandler(error);
      next(actionWith({
        type: failureType,
        error: message
      }));
    }
  );
};
