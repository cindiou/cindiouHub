const Router = require("koa-router");

const { create, showAvatar } = require("../controller/user.controller.js");
const {
  verifyUser,
  handlePassWord,
} = require("../middlewave/user.middlewave.js");

const userRouter = new Router({
  prefix: "/users",
});

userRouter.post("/", verifyUser, handlePassWord, create);
userRouter.get("/:userID/avatar", showAvatar);

module.exports = userRouter;
