const connection = require("../app/database");

class UserService {
  async create(user) {
    const { name, password } = user;

    const statement = "INSERT INTO users (name,password) VALUES (?,?)";
    const result = await connection.execute(statement, [name, password]);

    //创建用户，存储到数据库
    return result;
  }

  async getUserByName(name) {
    const statement = "SELECT  * FROM users WHERE name= ?";
    const [queryResult, fields] = await connection.execute(statement, [name]);

    return queryResult;
  }

  async updateAvatarUrlByUserID(id, avatarUrl) {
    const statement = `
      UPDATE users SET avatar_url=? WHERE id=?
    `;
    const [result] = await connection.execute(statement, [avatarUrl, id]);
    return result;
  }
}

module.exports = new UserService();
