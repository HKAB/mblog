const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var mongoose = require('mongoose');
const app = express()
var BlogPost = require("../models/blogpost");

app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || 8081)


mongoose.connect('mongodb://localhost:27017/blogposts', { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection Succeeded");
});

// Add new post
app.post('/posts', (req, res) => {
    var db = req.db;
    var title = req.body.title;
    var content = req.body.content;
    var author = req.body.author;
    var created = req.body.date;

    var new_post = new BlogPost({
        title: title,
        content: content,
        author: author,
        created: created
    })

    new_post.save(function(error) {
        if (error) {
            console.log(error)
        } else {
            res.send({
                success: true,
                message: 'Post saved successfully!'
            })
        }
    })
})

// Fetch all posts
app.get('/all', (req, res) => {
    BlogPost.find({}, {title: 1, author: 1, created_time: 1, tags: 1}, { skip: Number(req.query.from), limit: Number(req.query.limit)}, function(error, posts) {
        // if (error) { return next(new Error(err)) }
        res.send({ 'posts': posts })
    }).sort({ _id: -1 })
}) // https://stackoverflow.com/questions/25589113/how-to-select-a-single-field-in-mongodb
   //https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express
   // Find with specific fields and skip record already load.

// Fetch posts by Id
app.get('/all/:id', (req, res) => {
    BlogPost.findById(req.params.id, function(error, post) {
        if (error) { return next(new Error(err)) }
        res.send(post)
    })
})

// // Update post
// app.put('/posts/:id', (req, res) => {
//     var db = req.db;

//     BlogPost.findById(req.params.id, function(error, post) {
//         if (error) {
//             return next(new Error(err))
//         }

//         post.title = req.body.title
//         post.description = req.body.description

//         post.save(function(error) {
//             if (error) {
//                 console.log(error)
//             } else {
//                 res.send({
//                     success: true,
//                 })
//             }
//         })
//     })
// })

// // Delete post
// app.delete('/posts/:id', (req, res) => {
//   var db = req.db;
//   BlogPost.remove({
//     _id: req.params.id
//   }, function(err, post){
//     if (err)
//       res.send(err)
//     res.send({
//       success: true
//     })
//   })
// })