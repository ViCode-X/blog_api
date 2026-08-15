const express = require('express');
const router = express.Router();
const ValidateSchema = require('../middlewares/schema.middleware.js');

const {
    CreateArticleSchema, 
    UpdateArticleSchema, 
} = require('../validators/article.js');


const {
    searchArticles,
    postArticle,
    getAllArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById,
} = require('../controllers/article.controller.js');

router.get('/articles/search', searchArticles);

router.post('/articles', ValidateSchema(CreateArticleSchema), postArticle);

router.get('/articles', getAllArticle);

router.get('/articles/:id', getArticleById);

router.put('/articles/:id', ValidateSchema(UpdateArticleSchema), updateArticleById);

router.delete('/articles/:id', deleteArticleById);

module.exports = router;
