const { getLabelByName, create } = require("../service/label.service");

const verifyLabelsExist = async (ctx, next) => {
  const { labels } = ctx.request.body;

  //如果label不存在，则创建
  const labelsResult = [];

  try {
    for (const name of labels) {
      const label = { name }; //存储最后标签在label数据表中的id与name

      const labelQuery = await getLabelByName(name);
      if (!labelQuery) {
        const result = await create(name);
        label.id = result.insertId;
      } else {
        label.id = labelQuery.id;
      }

      labelsResult.push(label);
    }
  } catch (e) {
    console.log("label.middlewave:verifyLabelsExist=>", e);
  }
  ctx.labels = labelsResult;
  await next();
};

module.exports = {
  verifyLabelsExist,
};
