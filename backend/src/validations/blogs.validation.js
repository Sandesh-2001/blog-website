const Joi = require("joi");
const addBlog = Joi.object({
  title: Joi.string().required(),
  shortDesc: Joi.string().required(),
  publishDate: Joi.date().required(),
  timeToRead: Joi.number().required(),
  coverPhoto: Joi.string().required(),
  treanding: Joi.boolean().required(),
  tags: Joi.array().min(1).required(),
});

module.exports = { addBlog };
