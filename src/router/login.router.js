const Router = require("koa-router");
const loginRouter = new Router({
  prefix: "/login",
});

const { login, success } = require("../controller/login.controller");
const { verifyLogin, verifyAuth } = require("../middlewave/login.middlewave");

loginRouter.post("/", verifyLogin, login);
loginRouter.get("/test", verifyAuth, success);

module.exports = loginRouter;
