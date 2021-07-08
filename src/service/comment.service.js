const connection = require("../app/database");

class CommentServices {
  async create(userID, content, momentID) {
    const statement =
      "INSERT INTO comment (content,user_id,moment_id) VALUES (?,?,?)";

    const [result] = await connection.execute(statement, [
      content,
      userID,
      momentID,
    ]);
    return result;
  }

  async replay(userID, content, momentID, commentID) {
    const statement =
      "INSERT INTO comment (content,user_id,moment_id,comment_id) VALUES (?,?,?,?)";

    const [result] = await connection.execute(statement, [
      content,
      userID,
      momentID,
      commentID,
    ]);
    return result;
  }

  async update(commentID, content) {
    const statement = `UPDATE comment SET content=? WHERE id=?`;

    const [result] = await connection.execute(statement, [content, commentID]);

    return result;
  }

  async remove(commentID) {
    const statement = `DELETE FROM comment WHERE id=?`;
    const [result] = await connection.execute(statement, [commentID]);
    return result;
  }

  async getCommentsByMomentID(momentID) {
    const statement = `SELECT * FROM comment WHERE moment_id=?`;
    const [result] = await connection.execute(statement, [momentID]);
    return result;
  }
}

module.exports = new CommentServices();
