const Router = require("koa-router");

const { verifyAuth } = require("../middlewave/login.middlewave");
const {
  avatarHandler,
  pictureHandler,
  pictureResize,
} = require("../middlewave/file.middlewave");
const { saveAvatar, savePicture } = require("../controller/file.controller");

const fileRouter = new Router({
  prefix: "/upload",
});

/**
 * 不同上传文件，有不同文件类型或处理场景
 * 用户上传的文件需要专门的文件夹用来存储
 * uploads/avatar 存储用户头像
 * uploads/picture  用户其他图片
 *
 * fileRouter.post("/avatar",验证权限,中间件-保存图像,控制器-保存图像的信息)
 */

fileRouter.post("/avatar", verifyAuth, avatarHandler, saveAvatar);

//给某某动态添加配图
//pathname:upload/picture?momentId=1;
fileRouter.post(
  "/picture",
  verifyAuth,
  pictureHandler,
  pictureResize,
  savePicture
);

module.exports = fileRouter;
