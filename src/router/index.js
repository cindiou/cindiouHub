const fs = require("fs");

//批量导入该文件下的所有router;
const useRouters = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return;

    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
};

module.exports = useRouters;
