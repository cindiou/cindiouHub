const LabelService = require("../service/label.service");

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;

    const result = await LabelService.create(name);
    ctx.body = result;
  }

  async list(ctx, next) {
    const { offset, limit } = ctx.query;
    console.log(offset, limit);
    const result = await LabelService.getLabels(offset, limit);

    ctx.body = result;
  }
}

module.exports = new LabelController();
