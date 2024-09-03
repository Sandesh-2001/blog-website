const Joi = require("joi");
const middleware = (schema, property) => {
  return async (req, res, next) => {
    console.log("joi", schema);
    const { error } = await schema.validate(req.body, { abortEarly: false });
    const value = error == null;

    if (value) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      console.log("error", message);
      res.status(422).json({ error: message });
    }
  };
};
module.exports = middleware;
