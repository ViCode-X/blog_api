const Joi = require("joi");

const CreateArticleSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required(),
    excerpt: Joi.string().max(200).optional(), 
});

const validateArticle = (req, res, next) => {
    const { error } = CreateArticleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const UpdateArticleSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    content: Joi.string().min(10),
    excerpt: Joi.string().max(200).optional(), 
    author: Joi.string().min(2).optional(),
});

const validateUpdateArticle = (req, res, next) => {
    const { error } = UpdateArticleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    validateArticle,
    validateUpdateArticle,
};