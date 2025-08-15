require("dotenv").config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, "userName is required"],
        unique:true
    },
    email:{
        type:String,
        required:[true, "email is required"],
        trim:true,
        unique:true,
        match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'invalid email']
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    }
},{timestamps:true})

// hash password before saving
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
});
// create token
userSchema.methods.createJwt = function() {
    return jwt.sign({userId:this._id, name:this.userName,role:this.role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFESPAN});
};

// Compare password method for login
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};


module.exports = mongoose.model('user', userSchema);