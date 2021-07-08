const THE_TYPE_OF_NAME_OR_PASSWORD_IS_INVALID =
  "用户名和密码类型必须都为字符串";
const NAME_OR_PASSWORD_IS_NULL_STRING = "用户名或密码不能为空字符串";
const USER_ALREADY_EXISTS = "用户已经存在";

const USER_DOES_NOT_EXISTS = "用户不存在";
const PASSWORD_IS_INCORRECT = "密码不正确";

const NO_AUTHORIZATION = "token失效，授权失败";
const NOT_WITH_TOKEN = "未携带token或token不存在";
const NO_PERMISSION = "没有权限执行该操作";

module.exports = {
  THE_TYPE_OF_NAME_OR_PASSWORD_IS_INVALID,
  NAME_OR_PASSWORD_IS_NULL_STRING,
  USER_ALREADY_EXISTS,
  USER_DOES_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  NO_AUTHORIZATION,
  NOT_WITH_TOKEN,
  NO_PERMISSION,
};
