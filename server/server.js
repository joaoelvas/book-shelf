const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, { useNewUrlParser: true });

const { User } = require('./models/user');
const { Book } = require('./models/book');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

// GET //
app.get('/api/auth', auth, (req,res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    })
})

app.get('/api/user/logout', auth, (req,res) => {
    req.user.deleteToken(req.token, (err,user) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            message: 'Log out successful'
        });
    })
})

app.get('/api/book', (req,res) => {
    let id = req.query.id;

    Book.findById(id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(doc);
    })
})

app.get('/api/books', (req,res) => {

    let skip = req.query.skip;
    let limit = req.query.limit;
    let order = req.query.order; // order = asc || desc

    if(!skip) return res.status(400).json({
        message: 'Please provide query params: skip'
    })
    if(!limit) {
        return res.status(400).json({
            message: 'Please provide query params: limit'
        })
    } else if(limit >= 100) {
        return res.status(400).json({
            message: 'Limit as to be lower or equal to 100'
        })
    }
    if(!order) return res.status(400).json({
        message: 'Please provide query params: order (asc or desc)'
    })

    skip = parseInt(skip);
    limit = parseInt(limit);

    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(doc);
    })

})

app.get('/api/reviewer', (req,res) => {
    let id = req.query.id;

    User.findById(id ,(err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).send({
            name: doc.name,
            lastname: doc.lastname
        })
    })
})

app.get('/api/users', (req,res) => {
    User.find({}, (err,users) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(users);
    })
})

app.get('/api/user/posts', (req,res) => {
    Book.find({ownerId:req.query.user}).exec((err,docs) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(docs);
    })
})

// POST //
app.post('/api/book', (req,res) => {
    const book = new Book(req.body);

    book.save((err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        })
    })

})

app.post('/api/user', (req,res) => {
    const user = new User(req.body);

    user.save((err,doc) => {
        if(err) return res.status(400).json({
            success: false,
            err
        });
        res.status(200).json({
            success: true,
            user: doc
        })
    })
})

app.post('/api/user/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'Auth failed, email not found'})

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Wrong password'
            });

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})

// UPDATE //
app.put('/api/book', (req,res) => {
    Book.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            success: true,
            doc
        })
    })
})

// DELETE //
app.delete('/api/book', (req,res) => {
    let id = req.query.id;

    if(!id) return res.status(400).json({
        message: 'Please provide query params: id'
    });

    Book.findByIdAndRemove(id, (err,doc) => {
        if(err) return res.status(400).send(err);
        if(!doc) return res.status(400).json({
            deleted: false,
            message: `Book not found`,
            id
        });
        res.status(200).json({
            deleted: true,
            message: `Book deleted`,
            id
        })
    })
})


app.listen(config.PORT, () => {
    console.log(`Server running on port ` + config.PORT);
})