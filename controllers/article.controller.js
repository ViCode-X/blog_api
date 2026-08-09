const Joi = require ('joi');

const ArticleModel = require('../models/article.model.js');

const postArticle = async (req, res, next) => {
  const articleSchema = Joi.object ({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(20).required(),   
    author: Joi.string().optional().default("Guest"),
  }  );

  const { error, value } = articleSchema.validate(req.body);
  if (error) {
    return res.status(400).json("Please provide article title and content");

  }    
try {
    const {title, content } = value;
    const newArticle = new ArticleModel({
        title,
        content,

    });
    await newArticle.save();

    return res.status(200).json({
        message: "Article Created",
        data: newArticle
    });

    } catch (error){

        next(error);

    }
};



const getAllArticle = async (req, res, next) => {
    const {limit = 10, page = 1} = req.query;
    const skip = (page - 1) * limit;
    
    try {
        const articles = await ArticleModel.find({})
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

        return res.status(200).json({
            message: "Article fetched",
            data: articles
        });


    } catch (error){
        console.error(error);
        next(error);

    }
};

const getArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id);

        if(!article){
            return res.status(404).json({
                message: `Article with ${req.params.id} not found`,
            });
        }

        return res.status(200).json({
            message: "Article found",
            data: article,
        });
    } catch (error){
        console.error(error);
        next(error);

    }
};

const updateArticleById = async (req, res, next) => {
    const articleSchema = Joi.object ({
        title: Joi.string().min(5).optional(),
        content: Joi.string().min(20).optional(),
        author : Joi.string().optional().default("Guest"),
    }  );
    
    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            req.params.id, 
            {...req.body}, 
            { new: true,
              runValidators: true,
             }
        );

    if(!updatedArticle){
        return res.status(404).json({
            message: `Article with ${req.params.id} not found`,
        });
    }
        return res.status(200).json({
            message: "Article updated",
            data: updatedArticle
        });
    } catch (error){
        next(error);
    }
};

const deleteArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findByIdAndDelete(req.params.id);
        
        if(!article){
            return res.status(404).json({
                message: `Article with ${req.params.id} not found`,
            });
        }

        return res.status(200).json({
            message: `Article Deleted`,
            data: article
        });
    } catch (error){
        next(NativeError);
        
    }

};
module.exports = {
    postArticle,
    getAllArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById
};