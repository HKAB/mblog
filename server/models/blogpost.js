var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BlogPostSchema = new Schema({
  title: String,
  content: String,
  author: String,
  created_time: Date,
  tags: Array,
},

{
  collection: 'blogposts'
}
);

var BlogPost = mongoose.model("BlogPost", BlogPostSchema, 'blogposts');
module.exports = BlogPost;