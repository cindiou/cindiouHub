const CommentServices = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    const { id } = ctx.user;
    const { content, momentID } = ctx.request.body;

    const result = await CommentServices.create(id, content, momentID);
    ctx.body = result;
  }

  async reply(ctx, next) {
    const { id } = ctx.user;
    const { commentID } = ctx.params;
    const { content, momentID } = ctx.request.body;

    const result = await CommentServices.replay(
      id,
      content,
      momentID,
      commentID
    );
    ctx.body = result;
  }

  async update(ctx, next) {
    const { commentID } = ctx.params;
    const { content } = ctx.request.body;
    const result = await CommentServices.update(commentID, content);

    ctx.body = result;
  }

  async remove(ctx, next) {
    const { commentID } = ctx.params;
    const result = await CommentServices.remove(commentID);

    ctx.body = result;
  }

  async list(ctx, next) {
    const { momentID } = ctx.query;
    const result = await CommentServices.getCommentsByMomentID(momentID);
    ctx.body = result;
  }
}

module.exports = new CommentController();
