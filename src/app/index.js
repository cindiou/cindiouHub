const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const useRouters = require("../router");
const errorHandle = require("./error-handle");

const app = new Koa();
app.use(bodyParser());

//统一导入router文件夹下所有的router;
useRouters(app);

//监听错误信息
//统一处理错误
app.on("error", errorHandle);

module.exports = app;
