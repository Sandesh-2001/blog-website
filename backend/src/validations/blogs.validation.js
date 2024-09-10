const Joi = require("joi");
const addBlog = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().default("sandesh default"),
  shortDesc: Joi.string().required(),
  publishDate: Joi.date().iso().default("2024-01-01T00:00:00Z"),
  timeToRead: Joi.number().required(),
  coverPhoto: Joi.optional(),
  trending: Joi.boolean().optional(),
  tags: Joi.array().min(1).required(),
});

module.exports = { addBlog };
