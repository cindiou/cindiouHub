const path = require("path");

const multer = require("koa-multer");
const Jimp = require("jimp");

const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path");

//相对路径 基准：process.cwd
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, AVATAR_PATH);
    //文件夹需要手动创建
  },
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    const prefix = file.originalname.replace(ext, "");
    callback(null, prefix + "@" + Date.now() + ext);
  },
});
const avatarUpload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    // console.log(file);
    callback(null, true); //不进行过滤...全部都上传
  },
});

/* const avatarUpload = multer({
  dest: "./uploads/avatar", //不需要手动创建文件夹,自动创建文件夹
}); */

/**
 * format-data
 * KEY              VALUE         DESCRIPTION
 * avatar    (FILE) 选择的文件
 */
//取出format-data方式中上传文件的单个字段avatar所对应的上传文件
const avatarHandler = avatarUpload.single("avatar");

const pictureUpload = multer({
  dest: PICTURE_PATH,
});
const pictureHandler = pictureUpload.array("picture", 9);

const pictureResize = async (ctx, next) => {
  const { files } = ctx.req;

  //2.对图像进行处理
  try {
    for (let file of files) {
      const { filename, destination } = file;
      const filePath = path.join(destination, filename);

      Jimp.read(file.path).then((image) => {
        image.resize(1280, Jimp.AUTO).write(`${filePath}-large`);
        image.resize(640, Jimp.AUTO).write(`${filePath}-middle`);
        image.resize(320, Jimp.AUTO).write(`${filePath}-small`);
      });
    }

    await next();
  } catch (e) {
    console.log("fileMiddlewave-error-pictureResize:", e);
  }
};

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize,
};
/* module.exports = {
  avatarHandler: async (ctx, next) => {
    try {
      avatarHandler(ctx, next);
      ctx.body = "头像上传成功~";
    } catch (e) {
      console.log("FileMiddlewave-error-avatarHandler:", e);
    }
  },
}; */
