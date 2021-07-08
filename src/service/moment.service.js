const connection = require("../app/database");
const { APP_PORT, APP_HOST } = require("../app/config");

const SqlFragment = `
  SELECT 
  m.id id,
  m.content content,
  m.createAt createAt,
  m.createAt  createAt,
  JSON_OBJECT(
    'id',u.id,
    'name',u.name,
    'createAt',u.createAt,
    'updateAt',u.updateAt
  ) user
  FROM moment m
  LEFT JOIN users u ON m.user_id=u.id
`;

class MomentService {
  async create(userID, content) {
    const statement = `INSERT INTO moment (user_id,content) VALUES (?,?)`;

    const [res] = await connection.execute(statement, [userID, content]);

    return res; //非查询，不需要返回第一项
  }

  async getMomentByID(momentID) {
    const statement = `
      ${SqlFragment}
      WHERE m.id=?
    `;
    const [result] = await connection.execute(statement, [momentID]);
    return result[0];
  }

  async getMomentList(offset, size) {
    const statement = `
      SELECT 
        m.id id,
        m.content content,
        m.createAt createAt,
        m.createAt  createAt,
        JSON_OBJECT(
          'id',u.id,
          'name',u.name,
          'createAt',u.createAt,
          'createAt',u.updateAt,
          'avatarUrl',u.avatar_url
        ) user,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
        (SELECT 
          JSON_ARRAYAGG(
            CONCAT(
              '${APP_HOST}:${APP_PORT}/moment/images/',
              file.filename,
              '.',
              LOWER(INSERT(file.mimetype,1,6,''))
            )
          )
          FROM file
          WHERE m.id=file.moment_id
        ) images
      FROM moment m
      LEFT JOIN users u ON m.user_id=u.id
      LIMIT ?,?
    `;

    try {
      const [result] = await connection.execute(statement, [offset, size]);

      return result;
    } catch (e) {
      console.log("moment-error-getMomentList:", e);
    }
  }

  async update(momentID, content) {
    const statement = `UPDATE moment SET content=? WHERE id=?`;

    const [res] = await connection.execute(statement, [content, momentID]);
    return res;
  }

  async remove(momentID) {
    const statement = `DELETE FROM moment WHERE id=?`;
    const [result] = await connection.execute(statement, [momentID]);
    return result;
  }

  async hasLabel(labelID, momentID) {
    const statement = `SELECT * FROM moment_label WHERE label_id=? AND moment_id=?`;

    const [result] = await connection.execute(statement, [labelID, momentID]);
    return result[0] ? true : false;
  }

  async addLabel(labelID, momentID) {
    const statement = `INSERT INTO moment_label (label_id,moment_id) values (?,?)`;
    const [result] = await connection.execute(statement, [labelID, momentID]);
    return result;
  }
}

module.exports = new MomentService();

const MultiSql = `
  SELECT 
    m.id id,
    m.content content,
    m.createAt createAt,
    m.createAt  createAt,
    JSON_OBJECT(
      'id',u.id,
      'name',u.name,
      'createAt',u.createAt,
      'createAt',u.updateAt
      'avatarUrl',u.avatar_url,
    ) user,
    (
      SELECT (IF(COUNT(c.id),JSON_ARRAYAGG(
        JSON_OBJECT(
          'id',c.id,
          'content',c.content,
          'commentID',c.comment_id,
          'createAt',c.createAt,
          'user',JSON_OBJECT(
            'id',cu.id
            'name',cu.name,
            'avatarUrl',cu.avatar_url,
            'createAt',cu.createAt
          )
        )
      ),NULL)) FROM comment c 
      LEFT JOIN users cu ON c.user_id=cu.id
      WHERE m.id=c.moment_id
    ) commentList,
    IF(COUNT(l.id),JSON_ARRAYAGG(
      JSON_OBJECT(
        'id',l.id,
        'name',l.name
      )
    ),NULL) labels
  FROM moment m
  LEFT JOIN users u ON m.user_id=u.id
  LEFT JOIN moment_label ml  ON m.id=ml.moment_id
  LEFT JOIN label l ON l.id=ml.label_id
  WHERE m.id=?
  GROUP BY m.id
`;
