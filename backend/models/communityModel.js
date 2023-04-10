const mongoose = require('mongoose')
const User = require('./userModel')

const Schema = mongoose.Schema

/**
 * the database has a collection Community with
 * name: String
 * email: String
 * description: String
 * accounts: Array
 */
const communitySchema = new Schema(
    {
        email: {
          type: String,
          required: false,
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        accounts: {
            type: Array,
            required: false
        }
    }, {timestamps: true}
)

//Monogodb basically builds a colletion for us
module.exports = mongoose.model('Community', communitySchema)