const Joi = require('joi');


/**
 * validation of parameters entered by user before using them in server
 */

module.exports = {
    createPost: {
        body: {
            title: Joi.string().min(5).max(100).required(),
            description: Joi.string().min(20).max(1000),
            image: Joi.string()

        }
    },

    updatePost: {
        body: {
            title: Joi.string().min(5).max(100).required(),
            description: Joi.string().min(20).max(1000)
        }
    },

    deletePost: {
        body: {
            title: Joi.string().min(5).max(100).required()
        }
    },

    getPost: {
        query: {
            title: Joi.string().min(5).max(100),
            page: Joi.number().min(1),
            perPage: Joi.number().min(1).max(5),
        }
    }
}


