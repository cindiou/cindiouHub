const fs = require("fs");

const service = require("../service/use.service.js");
const { getAvatarByUserID } = require("../service/file.service");

const { AVATAR_PATH } = require("../constants/file-path");

class UserController {
  //异步操作
  async create(ctx, next) {
    //获取用户请求传递的参数
    const user = ctx.request.body;

    //查询数据
    const res = await service.create(user);
    //返回数据
    ctx.body = res;
  }

  async showAvatar(ctx, next) {
    const { userID } = ctx.params;
    const result = await getAvatarByUserID(userID);

    ctx.response.set("content-type", result.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}${result.filename}`);
  }
}

module.exports = new UserController();
