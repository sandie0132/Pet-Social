const User = require('../user/user.model');
const Post = require('./post.schema')


/**
 * create new post
 */

exports.createPost = async (userPost) => {
    try {
        const post = new Post(userPost);
        const savedPost = await post.save(); // post is saved to db
        return savedPost;
    } catch (error) {
        throw (error);
    }
};

/**
 * update existing post
 */

exports.updatePost = async (userPost) => {
    try {
        const result = await Post.updateOne({ "title": userPost.title },
            { $set: { "description": userPost.description, "updatedOn": Date.now() } }); //post is updated and set to the value to be updated
        return result;
    }
    catch (error) {
        throw (error);
    }
}

/**
 * delete existing ppost
 */
exports.deletePost = async (userPost) => {
    try {
        //post deletes based on user title
        const user = await Post.deleteOne({ title: userPost.title }, (err, user) => {
            if (err)
                return err;
            return user;
        })
        return user
    } catch (error) {
        throw (error)
    }
}

/**
 * retreive post saved in db 
 */
exports.getPost = async (userPost) => {
    try {
        let perpage = 3;
        let page = userPost.headers.page;
        const postTitle = userPost.headers.title;
        // console.log("posttitle in services is", postTitle);
        if ((postTitle) !== undefined) {
            const users = Post.find({ title: postTitle }).populate("createdBy"); //if title is given post is retreived here
            return users
        }
        else {
            const users = await Post.find({ createdBy: userPost.user._id }).populate("createdBy").limit(perpage).skip((page - 1) * perpage).exec();
            return users;
        }
    } catch (error) {
        throw (error)
    }
}


exports.commentPost = async (commentBody) => {
    try {
        const postUser = await Post.find({ title: commentBody.title })
        if (!postUser) {
            return "no such user exist";
        }
        else {
            const postAfterComment = await Post.update({ title: commentBody.title },
                { $push: { comments: { comment: commentBody.comment, commentedBy: postUser[0].createdBy } } })
            return postAfterComment
        }
    } catch (error) {
        throw (error)
    }
}
