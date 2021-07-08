const jwt = require("jsonwebtoken");

const { PUBLIC_KEY } = require("../app/config");
const {
  NAME_OR_PASSWORD_IS_NULL_STRING,
  THE_TYPE_OF_NAME_OR_PASSWORD_IS_INVALID,
  USER_DOES_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  NO_AUTHORIZATION,
  NOT_WITH_TOKEN,
  NO_PERMISSION,
} = require("../constants/error-types");

const { getUserByName } = require("../service/use.service.js");
const { checkResource } = require("../service/login.service");

const md5PassWord = require("../utils/password-handle");

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  //1.用户名与密码不为空
  if (typeof name !== "string" || typeof password !== "string") {
    const error = new Error(THE_TYPE_OF_NAME_OR_PASSWORD_IS_INVALID);
    return ctx.app.emit("error", error, ctx);
  }

  if (name === "" || password === "") {
    const error = new Error(NAME_OR_PASSWORD_IS_NULL_STRING);
    return ctx.app.emit("error", error, ctx);
  }

  //2.用户是否存在
  const result = await getUserByName(name);
  const user = result[0];
  // console.log(result);
  if (!user) {
    const error = new Error(USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  //3.密码是否正确
  if (md5PassWord(password) !== user.password) {
    const error = new Error(PASSWORD_IS_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user; //拿到数据库返回的user对象
  await next();
};

const verifyAuth = async (ctx, next) => {
  //1.获取token
  const auth = ctx.headers.authorization;
  if (!auth) {
    const error = new Error(NOT_WITH_TOKEN);
    return ctx.app.emit("error", error, ctx);
  }
  const token = auth.replace("Bearer ", "");
  //2.验证token
  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    ctx.user = res; //传递已认证的用户信息到下一中间件
    await next();
  } catch (e) {
    //验证失败，转到错误处理
    const error = new Error(NO_AUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

/**
 * @param {ctx}
 * @param {next}
 *
 * 1.很多内容都需要验证权限：修改/删除动态或评论
 * 2.接口：业务接口系统/后端管理系统
 * 一对一：user=>role
 * 多对多：role=>menu（删除动态/修改动态)
 */
const verifyPermission = async (ctx, next) => {
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace(/(ID|Id)$/, "");
  const resourceID = ctx.params[resourceKey];
  const { id } = ctx.user;

  try {
    const isPermission = await checkResource(tableName, resourceID, id);

    if (!isPermission) throw new Error();

    await next();
  } catch (e) {
    const error = new Error(NO_PERMISSION);
    return ctx.app.emit("error", error, ctx);
  }
};

//另一种办法
/* 
const verifyPermission=(tableName)=>{
  return async (ctx,next)=>{
    
  }
}
*/

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
