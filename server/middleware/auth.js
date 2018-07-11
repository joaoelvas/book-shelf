const { User } = require('../models/user');

let auth = (req, res, next) => {
    let token = req.cookies.auth;

    User.findByToken(token, (err,user) => {
        console.log(user._id)
        if(err) throw err;
        if(!user) return res.status(404).json({
            success: false,
            message: 'No user logged in'
        })
        req.token = token;
        req.user = user;
        next();
    })

}

module.exports = { auth }