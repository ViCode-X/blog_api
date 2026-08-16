const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 

}, 
{timestamps: true}
);

userSchema.index({ title: 'text', content: 'text' });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
