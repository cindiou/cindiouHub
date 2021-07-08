const app = require("./app");
const { APP_PORT } = require("./app/config.js");

// console.log("type:", typeof APP_PORT);
// console.log("port:", APP_PORT);
// console.log(`port数值是${APP_PORT}...`);

app.listen(APP_PORT, () => {
  console.log(`服务器端口${APP_PORT}启动成功...`);
});
