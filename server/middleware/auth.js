const { User } = require('../models/user');

let auth = (req, res, next) => {
    let token = req.cookies.auth;

    if(!token) return res.json({
        success: false,
        message: 'No user logged in'
    })

    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.json({
            success: false,
            message: 'No user logged in'
        })
        req.token = token;
        req.user = user;
        next();
    })

}

module.exports = { auth }