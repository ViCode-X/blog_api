const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
 title: {
            type: String,
            required: true,
            minlength: 5,
            trim: true,
        },

        slug: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
            required: false,
        },

        content: {
            type: String,
            required: true,
            minlength: 20,
        },

        excerpt: {
            type: String,
            maxlength: 300,
            trim: true,
        },

        author: {
            type: String,
            default: "Guest",
            trim: true,
        },

        category: {
            type: String,
            default: "General",
            trim: true,
        },

        tags: {
            type: [String],
            default: [],
        },

        published: {
            type: Boolean,
            default: false,
        },

        publishedAt: {
            type: Date,
            default: null,
        },

        views: {
            type: Number,
            default: 0,
            min: 0,
        },
    }
,{ timestamps: true }
);


// MongoDB text index
articleSchema.index({
    title: "text",
    content: "text",
    excerpt: "text",
    tags: "text",
});

// Automatically generate slug from title
articleSchema.pre("validate", async function () {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;