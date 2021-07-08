const connect = require("../app/database");

class LoginService {
  async checkResource(tableName, resourceID, userID) {
    const statement = `SELECT * FROM ${tableName} WHERE id=? AND user_id=?`;

    const [res] = await connect.execute(statement, [resourceID, userID]);
    return res.length === 0 ? false : true;
  }

  async checkAvatar() {}
}

module.exports = new LoginService();
