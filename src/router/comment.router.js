const Router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middlewave/login.middlewave");
const {
  create,
  reply,
  update,
  remove,
  list,
} = require("../controller/comment.controller");

const commentRouter = new Router({
  prefix: "/comment",
});

commentRouter.post("/", verifyAuth, create);
commentRouter.post("/:commentID/reply", verifyAuth, reply);
commentRouter.patch("/:commentID", verifyAuth, verifyPermission, update);
commentRouter.delete("/:commentID", verifyAuth, verifyPermission, remove);

//获取某个动态下的所有评论（列表）
//?momentID=1
commentRouter.get("/", list);

module.exports = commentRouter;
