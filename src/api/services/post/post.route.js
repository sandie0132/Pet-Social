const express = require('express');
const validate = require('express-validation');
const controller = require('../post/post.controller');
const { authorize } = require('../../middlewares/auth');
const path = require("path");
const
  { createPost,
    updatePost,
    deletePost,
    getPost } = require('./post.validation');

/**
 *  imported multer for uploading files
 */

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
    //Appending .jpg
  }
})

const upload = multer({ storage: storage });

const router = express.Router();



router
  .route('/createPost')
  /**
   * @api {post} v1/post/createPost Create Post
   * @apiDescription create a new post
   * @apiName Create Post
   * @apiGroup Post
   * @apiPermission user
   * 
   * @apiHeader {String} Authorization users access token
   * 
   * 
   * @apiParam  {String}             title        Title of post
   * @apiParam  {String{..128}}      description  Post's description
   * @apiParam   {String}             file         file to be uploaded
   * @apiSuccess  {String}  id               Post id
   *
   * @apiSuccess {String}  Title            Post Title
   * @apiSuccess {String}  Description      Post Descriptiuon
   * @apiSuccess {String}  image            Image Url
   * @apiSuccess {Date}    createdAt        Timestamp
   * @apiSuccess {Date}    createdOn        Timestamp
   * @apiSuccess {String}  createdBy        post creator
   */

  .post(authorize(), upload.single('myFile'), validate(createPost), controller.createPost)



/**
 * @api {put} v1/post/updatePost Update Post
 * @apiDescription to update any post
 * @apiName Update Post
 * @apiGroup Post
 * @apiPermission user
 * 
 * @apiHeader {String} Authorization users access token
 * 
 * 
 * @apiParam  {String}             title        Title of post to be updated
 * @apiParam  {String{..128}}      description  Post's description if changes required
 *
 * @apiSuccess  {String}  id               Post id
 * @apiSuccess {String}  Title            Post Title
 * @apiSuccess {String}  Description      Post Descriptiuon
 * @apiSuccess {String}  image            Image Url
 * @apiSuccess {Date}    createdAt        Timestamp
 * @apiSuccess {Date}    createdOn        Timestamp
 * @apiSuccess {String}  createdBy        post creator
 */


router.route('/updatePost').put(authorize(), validate(updatePost), controller.updatePost);





/**
 * @api {post} v1/post/deletePost Delete Post
 * @apiDescription to delete a post 
 * @apiName Delete Post
 * @apiGroup Post
 * @apiPermission user
 * 
 * @apiHeader {String} Authorization users access token
 * 
 * 
   * @apiParam  {String}             title        Title of post
   * 
   *@apiSuccess  {String}  message       number of rows modified
   
 */

router.route('/deletePost').delete(authorize(), validate(deletePost), controller.deletePost);



/**
 * @api {post} v1/post/getPost Get Post
 * @apiDescription to list posts by particular user or title
 * @apiName Get Post
 * @apiGroup Post
 * @apiPermission user
 * 
 * @apiHeader {String} Authorization users access token
 * 
 * 
   * @apiParam  {String}             title        Title of post
   * or
   * @apiParam  {String{..128}}      email        Post's description
   *
*
   *list of users
   *
   *@apiSuccess  {String}  id               Post id
   * @apiSuccess {String}  Title            Post Title
   * @apiSuccess {String}  Description      Post Descriptiuon
   * @apiSuccess {String}  image            Image Url
   * @apiSuccess {Date}    createdAt        Timestamp
   * @apiSuccess {Date}    createdOn        Timestamp
   * @apiSuccess {String}  createdBy        post creator
 */

router.route('/getPost').get(authorize(), validate(getPost), controller.getPost);



router.route('/commentPost').post(authorize(), controller.commentPost)

router.route('/uploads').get(controller.getImage)


module.exports = router;
