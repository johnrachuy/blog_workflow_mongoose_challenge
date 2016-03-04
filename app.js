var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/mongo_blog');
mongoose.model(
    'Blog_Post',
    new Schema({
            "title": String,
            "author": String,
            "date": Date,
            "entry": String,
            "comment": String
        },
        {
            collection: 'blogs'
        }
    ));

var Blog_Post = mongoose.model('Blog_Post');

app.post('/blog_post', function(req, res) {
    var newPost = new Blog_Post({
        "title": req.body.title,
        "author": req.body.author,
        "date": req.body.date,
        "entry": req.body.entry
    });

    newPost.save(function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        Blog_Post.find({}, function(err, data) {
            if(err) {
                console.log('ERR: ', err);
            }

            res.send(data);
        });
    });
});

app.get('/blog_post', function(req, res) {
    console.log('here');
    Blog_Post.find({}, function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        res.send(data);
        console.log(data);
    });
});

app.put('/blog_post', function(req, res){
    //console.log(req.body);
    var editPost = {
        "title": req.body.title,
        "author": req.body.author,
        "date": req.body.date,
        "entry": req.body.entry,
        "comment": req.body.comment
    };

    Blog_Post.findByIdAndUpdate(

        {_id: req.body._id},

        {
            $set: {
                title: editPost.title,
                author: editPost.author,
                date: editPost.date,
                entry: editPost.entry,
                comment: editPost.comment
            }
        },
        function(err, data) {
            if(err) {
                console.log('ERR: ', err);
            }

            res.send(data);
        }
    );
});

app.delete('/blog_post/:id', function(req, res) {
    Blog_Post.findByIdAndRemove({"_id" : req.params.id}, function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        res.send(data);
    });
});

// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});