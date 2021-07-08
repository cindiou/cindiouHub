const mysql = require("mysql2");
const config = require("./config.js");

const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  database: config.MYSQL_DATABASE,
  port: config.MYSQL_PORT,
  user: config.MYSQL_ROOT,
  password: config.MYSQL_PASSWORD,
  // connectionLimit
});

connections.getConnection((err, conn) => {
  if (err) {
    console.log("========数据库连接失败========\n错误原因:", err);
  }

  conn.connect((error) => {
    if (error) {
      console.log("========数据库连接失败========\n错误原因:", error);
      return;
    }

    console.log("数据库连接成功...");
  });
});

module.exports = connections.promise();
