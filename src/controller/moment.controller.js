const MomentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    //1.获取相应数据
    const userID = ctx.user.id;
    const content = ctx.request.body.content;

    //2.插入到数据库中
    const res = await MomentService.create(userID, content);

    ctx.body = res;
  }

  async detail(ctx, next) {
    const momentID = ctx.params.momentID;

    const result = await MomentService.getMomentByID(momentID);

    ctx.body = result;
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await MomentService.getMomentList(offset, size);

    ctx.body = result;
  }

  async update(ctx, next) {
    const { momentID } = ctx.params;
    const { content } = ctx.request.body;

    const result = await MomentService.update(momentID, content);

    ctx.body = result;
  }

  async remove(ctx, next) {
    const { momentID } = ctx.params;

    const result = await MomentService.remove(momentID);

    ctx.body = result;
  }

  async addLabels(ctx, next) {
    const { labels } = ctx;
    const { momentID } = ctx.params;

    try {
      for (const label of labels) {
        const isExist = await MomentService.hasLabel(label.id, momentID);

        if (!isExist) {
          await MomentService.addLabel(label.id, momentID);
        }
      }

      ctx.body = "成功给动态添加了标签";
    } catch (e) {
      console.log("moment.controller:addLabels=>", e);
    }
  }
}

module.exports = new MomentController();
