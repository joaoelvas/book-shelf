const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        maxlength: 100
    },
    lastname: {
        type: String,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
})

userSchema.pre('save', function(next) {
    const user = this;

    if(user.isModified('password')) {

        bcrypt.genSalt(SALT_I, (err, salt) => {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })

    } else next();
})

userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,(err, isMatch) => {
        if(err) return cb(err);
        cb(null,isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    const user = this;
    jwt.sign(user._id.toHexString(), config.SECRET,(err,token) => {
        user.token = token;
        user.save((err, user) => {
            if(err) return cb(err);
            cb(null,user)
        })
    });

    // user.token = token;
    // user.save((err, user) => {
    //     if(err) return cb(err);
    //     cb(null,user)
    // })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }