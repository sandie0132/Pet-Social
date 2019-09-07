const mongoose = require('mongoose')
const slugify = require('slugify');
const mongooseSlugPlugin = require('mongoose-slug-plugin');
/**
 * create a post model to be saved in database
 */


const postSchema = mongoose.Schema({
  title: { //title is unique and a string
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String,
  },
  createdOn: { //this field saves the time of post created
    type: Date,
    default: Date.now()
  },
  updatedOn: { //this field saves the time of post updated
    type: Date,
    default: Date.now()
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //this field saves the post creator email

  image: {
    type: String
  }, //image name and mime type is saved
  comments: [{
    userId: String,
    comment: String,
    commentedBy: String
  }],



});


/**
 * used slug to replace spaces in title and stores it in db
 */
postSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=title%>', slug: slugify });


/**
 * export the post model to be used in other model
 */
module.exports = mongoose.model('Posst', postSchema);