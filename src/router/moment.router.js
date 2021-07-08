const Router = require("koa-router");
const momentRouter = new Router({
  prefix: "/moment",
});

const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
} = require("../controller/moment.controller");

const {
  verifyAuth,
  verifyPermission,
} = require("../middlewave/login.middlewave");

const { verifyLabelsExist } = require("../middlewave/label.middlewave");
const { showFile } = require("../controller/file.controller");

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/", list);
momentRouter.get("/:momentID", detail);

//1.用户必须登录（授权）
//2.登录的用户是否有权限修改该评论，该评论必须是该用户发布的
momentRouter.patch("/:momentID", verifyAuth, verifyPermission, update);
momentRouter.delete("/:momentID", verifyAuth, verifyPermission, remove);

//给动态添加标签
momentRouter.post(
  "/:momentID/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelsExist,
  addLabels
);

//获取动态下的配图
//pathname:moment/images/fc56cd8b086b8376cb27bd614528b271.jpeg?type=small
momentRouter.get("/images/:file", showFile);

module.exports = momentRouter;
