const UserModel = require('../models/user.model');
const Joi = require('joi');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const registerUser = async (req, res, next) => {

    const registerSchema = Joi.object ({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { email, password, name } = req.body;


        const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
        name : name,
        email : email,
        password: hashed,
    });

    await newUser.save();
    return res.status(200).json({ message: 'User registered successfully' });
} catch (error) {
    next(error);
}



};

const loginUser = async (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    
    const { error } = loginSchema.validate(req.body);   
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email});

    if (!user) {
        return res.status(400).json({ error: 'User does not exits' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
        {userId: user._id, name: user.name},
        process.env.JWT_SECRET, //secret
        { expiresIn: '7d' }
    );


    const resUser = {   
      _id: user._id,
      email: user.email,
      name: user.name,
    };  
    return res.status(200).json({ message: 'Logged in', user: resUser, token });

} catch (error) {
    next(error);
}
};

module.exports = {loginUser, registerUser};