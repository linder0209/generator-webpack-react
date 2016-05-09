import merge from 'lodash/merge'
import union from 'lodash/union'

/*eslint-disable indent*/
/**
 * 分页抽象函数，也可以用来处理不是分页的列表数据
 * 创建 reducer 来管理分页或列表数据，并给出根据不同的 action 来处理不同的 handle
 * 外层包裹了一层函数，用来处理根据不同的 type 匹配不同的 reducer
 * @param types
 * @param paging 是否是分页，默认为分页
 * @param cleanType  表示清空数据
 * @param customTypes 自定义 reducer type, 数据格式为对象,键值分别表示 type 和处理的函数
 * @returns {updatePagination}
 */
function paginate({types, paging = true, cleanType, customTypes}) {
  // 首先检测传入的数据类型是否正确
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('types 应该是一个数组，并且包含三个对象。');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('数组中每个 type 应该是一个 string 类型。');
  }

  const [ requestType, successType, failureType ] = types;

  const customTypesArray = customTypes ? Object.keys(customTypes) : [];

  // 更新分页或列表数据
  function updatePaginationByFetchType(state, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isFetching: true
        });
      case successType:
      {
        const {result, currentPage, totalPage, lastPage, entities} = action.res;
        // action 中定义的 entity 与 schema 中一致,利用 normalize 会生成 entities 和 ids 的
        const {entity} = action;
        return merge({}, state, paging ? {
          entity: merge({}, state.entity, entities[entity]), //合并
          ids: union(state.ids, result),
          isFetching: false,
          currentPage,
          totalPage,
          lastPage,
          pageNo: lastPage ? state.pageNo : state.pageNo + 1
        } : {
          entity: merge({}, state.entity, entities[entity]), //合并
          ids: union(state.ids, result),
          isFetching: false
        });
      }
      case failureType:
        return merge({}, state, {
          isFetching: false
        });
      default:
        return state;
    }
  }

  // 根据不同的 key 返回处理不同的数据
  return function updatePagination(state = paging ? {
    isFetching: false,
    pageNo: 1, //下一页
    currentPage: 1
  } : {
    isFetching: false
  }, action) {
    if (customTypesArray.indexOf(action.type) !== -1) {
      return customTypes[action.type](state, action);
    }

    switch (action.type) {
      case cleanType:
      {
        return paging ? {
          isFetching: false,
          pageNo: 1, //下一页
          currentPage: 1
        } : {
          isFetching: false
        };
      }
      case requestType:
      case successType:
      case failureType:
      {
        return merge({}, state, updatePaginationByFetchType(state, action));
      }
      default:
        return state;
    }
  };
}

export default paginate;
