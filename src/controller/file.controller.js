const fs = require("fs");

const FileService = require("../service/file.service");
const UserService = require("../service/use.service");

const { APP_PORT, APP_HOST } = require("../app/config");
const { PICTURE_PATH } = require("../constants/file-path");

class FileController {
  async saveAvatar(ctx, next) {
    try {
      const { id } = ctx.user;
      const { filename, mimetype, size } = ctx.req.file;

      //1.保存头像信息到 表avatar
      const result = await FileService.createAvatar(
        filename,
        mimetype,
        size,
        id
      );

      //2.保存头像URL到 表users
      //http://localhost:8000/users/1/avatar
      const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
      await UserService.updateAvatarUrlByUserID(id, avatarUrl);

      ctx.body = "上传头像成功~";
      /*       ctx.body = {
        code:1001,
        message:'上传头像成功'
      }; */
    } catch (e) {
      console.log("FileControl-error-saveAvatar:", e);
    }
  }

  async savePicture(ctx, next) {
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.query;

    try {
      for (const file of files) {
        const { filename, mimetype, size } = file;

        await FileService.createFile(filename, mimetype, size, id, momentId);
      }

      ctx.body = "上传图片成功";
    } catch (e) {
      console.log("fileController-error-createPicture:", e);
    }
  }

  async showFile(ctx, next) {
    const types = ["small", "middle", "large"];
    const { file } = ctx.params;
    const { type } = ctx.query;
    const [queryFileName, ext] = file.split(".");

    try {
      const result = await FileService.getFileByFilename(queryFileName);
      let { filename, mimetype } = result;

      const reg = new RegExp(ext + "$", "i");

      if (filename && reg.test(mimetype)) {
        if (types.includes(type)) {
          filename += "-" + type; //返回对应规格的图片
        }

        ctx.response.set("content-type", mimetype);
        ctx.body = fs.createReadStream(`${PICTURE_PATH}${filename}`);
      } else {
        ctx.body = "后缀出错或不存在该图片";
      }
    } catch (e) {
      console.log("fileController-error-showFile:", e);
    }
  }
}

module.exports = new FileController();
