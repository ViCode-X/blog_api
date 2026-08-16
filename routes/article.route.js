const express = require('express');
const router = express.Router();
const ValidateSchema = require('../middlewares/schema.middleware.js');

const requireAuth = require('../middlewares/requireAuth.js');


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

router.post('/articles', ValidateSchema(CreateArticleSchema), requireAuth, postArticle);

router.get('/articles', requireAuth, getAllArticle);

router.get('/articles/:id', requireAuth, getArticleById);

router.put('/articles/:id', ValidateSchema(UpdateArticleSchema), updateArticleById);

router.delete('/articles/:id', deleteArticleById);

module.exports = router;
