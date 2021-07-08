const {
  NAME_OR_PASSWORD_IS_NULL_STRING,
  THE_TYPE_OF_NAME_OR_PASSWORD_IS_INVALID,
  USER_ALREADY_EXISTS,
} = require("../constants/error-types");

const { getUserByName } = require("../service/use.service.js");

const md5PassWord = require("../utils/password-handle");

//===封装模块
const verifyUser = async (ctx, next) => {
  //1.获取用户名或密码
  const { name, password } = ctx.request.body;

  //2.判断用户名或密码不能为空,校验类型
  if (typeof name !== "string" || typeof password !== "string") {
    const error = new Error(THE_TYPE_OF_NAME_OR_PASSWORD_IS_INVALID);
    return ctx.app.emit("error", error, ctx);
  }
  if (name === "" || password === "") {
    const error = new Error(NAME_OR_PASSWORD_IS_NULL_STRING);
    return ctx.app.emit("error", error, ctx);
  }

  //3.判断用户名是否已经被注册
  const result = await getUserByName(name);
  console.log(result);
  if (result.length) {
    const error = new Error(USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

const handlePassWord = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5PassWord(password);

  await next();
};

module.exports = {
  verifyUser,
  handlePassWord,
};
