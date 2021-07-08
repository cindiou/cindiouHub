const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class LoginController {
  async login(ctx, next) {
    const { name, id } = ctx.user;

    const token = jwt.sign({ name, id }, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 60 * 60 * 24,
    });

    ctx.body = {
      name,
      id,
      token,
    };
  }

  async success(ctx, next) {
    ctx.body = "授权成功~";
  }
}

module.exports = new LoginController();
