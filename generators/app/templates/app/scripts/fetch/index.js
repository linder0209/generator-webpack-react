import 'isomorphic-fetch';
import assign from 'lodash/assign';
import {URL_ROOT} from '../config';

// 定义 fetch 默认选项， 看 https://github.com/github/fetch
const defaultOptions = {
  method: 'post',
  //credentials: 'include', //设置该属性可以把 cookie 信息传到后台
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
};

function checkStatus(response) {
  const status = response.status;
  if (status >= 200 && status < 300) {
    return response;
  }
  let error = new Error(response.statusText);
  error.response = response;
  error.errorCode = status;
  throw error;
}

/**
 * 封装 fetch
 * 根据业务需求，还可以在出错的地方处理相应的功能
 * @param url
 * @param options
 * @param jsonUrl 本地测试
 * @returns {Promise.<TResult>}
 */
function callApi({url, options, jsonUrl}) {
  if (!url) {
    let error = new Error('请传入 url');
    error.errorCode = 0;
    return Promise.reject(error);
  }

  const protocol = location.protocol;
  let fullUrl;
  if (url.indexOf('http') === 0) {
    fullUrl = url;
  } else {
    fullUrl = (url.indexOf(URL_ROOT) === -1) ? protocol + URL_ROOT + url : protocol + url;
  }

  let _options = assign({}, defaultOptions, options);

  //测试代码
  if (jsonUrl) {
    fullUrl = jsonUrl;
    _options.method = 'get';
    delete _options.body;
  }

  return fetch(fullUrl, _options)
    .then(checkStatus)
    .then(response =>
      response.json().then(json => ({json, response}))
    ).then(({json, response}) => {
      if (!response.ok || json.success !== true) {
        // 根据后台实际返回数据来定义错误格式
        let error = new Error(json.message || '获取数据出错');
        error.json = json;
        //error.errorCode = 'b-001';//这里也可以直接去后台返回的错误 code
        return Promise.reject(error, json);
      }

      return {json, response};
    }).catch((error) => {
      return Promise.reject(error);
    });
}

export default callApi;
