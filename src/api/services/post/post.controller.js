
const service = require('../post/post.services')

/* 
Create new post and upload files to file folder
 */


exports.createPost = async (req, res, next) => {
    try {
        console.log("i am user id>>>>", req.user)
        const response = await service.createPost({ ...req.body, createdBy: req.user, image: req.file.path });
        return res.json(response);
    } catch (error) {
        return next(error);
    }
};

/**
 * update post and save the updated post to database
 */

exports.updatePost = async (req, res, next) => {
    try {
        const response = await service.updatePost(req.body);
        return res.json({
            updated: response
        })
    } catch (error) {
        return next(error)

    }

}

/** 
 * delete post saved in database using title field
*/

exports.deletePost = async (req, res, next) => {
    try {
        const response = await service.deletePost(req.body);
        if (response) {
            return res.json(response);
        }
    } catch (err) {
        next(err)
    }
}

/**
 * fetch single or multiple post from database 
 */

exports.getPost = async (req, res, next) => {
    try {
        // console.log("in controlsler get post", req);
        const response = await service.getPost(req);
        return res.json({
            users: response
        })
    } catch (error) {
        next(error);
    }
}

exports.commentPost = async (req, res, next) => {
    try {
        const response = await service.commentPost(req.body);
        res.json({
            message: response
        })
    } catch (error) {
        next(error);
    }
}



exports.getImage = (req, res) => {

    res.sendFile(path.join(__dirname, "./uploads/test.jpeg"));

}