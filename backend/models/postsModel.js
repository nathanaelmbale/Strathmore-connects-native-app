const mongoose = require('mongoose')

const Schema = mongoose.Schema

/**
 * the database has a collection post
 * title: String,
 * description:String,
 * category: String,
 * community:String,
 * imagePath: String,
 * user_id: String,
 * email: String,
 * comments: {
 * _id: mongoose object                     
 * comment: String, 
 * user:String,
)
 */
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        community: {
            type: String,
            required: true
        },
        imagePath: {
            type: String,
            required: false
        },
        user_id: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        comments: {
            type: [{
                _id: {
                    type: mongoose.Schema.Types.ObjectId,//mongoose object
                    default: mongoose.Types.ObjectId // generate a new ObjectId by default
                },
                comment: {
                    type: String,
                },
                user: {
                    type: String,
                    required: true
                }
            }],
            required: false
        }
    }, { timestamps: true }
)
//item basically builds a colletion for us
module.exports = mongoose.model('Post', postSchema)