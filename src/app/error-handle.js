const errorTypes = require("../constants/error-types");

const errorHandle = (err, ctx) => {
  let status, message;

  switch (err.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_NULL_STRING:
      status = 400; //错误的数据请求
      message = err.message;
      break;
    case errorTypes.THE_TYPE_OF_NAME_OR_PASSWORD_IS_INVALID:
      status = 400;
      message = err.message;
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400;
      message = err.message;
      break;
    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 400;
      message = err.message;
      break;
    case errorTypes.NO_AUTHORIZATION:
      status = 401; //未授权
      message = err.message;
      break;
    case errorTypes.NOT_WITH_TOKEN:
      status = 400;
      message = err.message;
      break;
    case errorTypes.NO_PERMISSION:
      status = 401; //未授权
      message = err.message;
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409; //数据冲突
      message = err.message;
      break;
    default:
      status = 404;
      message = "not found";
  }

  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandle;
