/**
 * 错误 code
 * b 开头的表示业务错误,根据实际需要自己定义
 */
const errorCode = {
  '401': '该请求不存在',
  '404': '该请求不存在',
  '500': '服务器出错',
  '501': '格式不对',
  '502': '无网络连接，请检查您的网络！',
  '503': '服务器拒绝',
  'b-001': '获取数据出错'
};

const errorMapping = {
  'Failed to fetch': '无网络连接，请检查您的网络！',
  'Network request failed': '无网络连接，请检查您的网络！',
  failed: '无网络连接，请检查您的网络！'
};

export default function (error, errorMsg) {
  if (errorMsg) {
    return errorMsg;
  }
  if (error.errorCode && errorCode[error.errorCode]) {
    return errorCode[error.errorCode];
  }
  if (error.message && errorMapping[error.message]) {
    return errorMapping[error.message];
  }
  if (error.message && error.message.toLowerCase().indexOf('failed') !== -1) {
    return errorMapping.failed;
  }

  return error.message || '请求失败';
}

