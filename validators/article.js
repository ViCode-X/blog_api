const Joi = require("joi");

const CreateArticleSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required(),
    excerpt: Joi.string().max(200).optional(), 
});

const UpdateArticleSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    content: Joi.string().min(10),
    excerpt: Joi.string().max(200).optional(), 

});

module.exports = {
    CreateArticleSchema,
    UpdateArticleSchema,
};