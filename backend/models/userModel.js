const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
/**
 * the database has a collection User with
 * name: String
 * email: String
 * password: String
 * admin: Boolean
 * notification:{
 * _id: Mongoose Object ,
 *  name: String ,
 * description: String
 * }
 */
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: false
    },
    notification: {
        type: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: false
            }
        }],
        required: false
    }
})

// static signup method
userSchema.statics.signup = async function (name ,email, password) {

    //validation checks fields available
    if (!email || !password || !name) {
        throw Error('You are required to input values in all fields above')
    }
    //validity of email
    if (!validator.isEmail(email)) {
        throw Error('Invalid email ,please try again')
    }

    //find the user by email
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    //this encrypts the password in the case the application is accessed
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name ,email, password: hash })

    return user
}

//static login method
userSchema.statics.login = async function (email, password) {

    //validation checks fields available
    if (!email || !password) {
        throw Error('You are required to input values in all fields above')
    }

    //find the user by email
    const user = await this.findOne({ email })
    
    //checks if user was found
    if (!user) {
        throw Error('Incorrect email')
    }

    //hashes the current password and compares it to the harshed version
    const match = await bcrypt.compare(password, user.password)

    //if the password is incorrect
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}


userSchema.statics.findByEmail = async function (email) {
    //checks if the email was inputed
    if (!email) {
        throw Error('You are requires to input values in all fields above')
    }

    //finds user by email
    const user = await this.findOne({ email })

    //finds user by email
    if (!user) {
        throw Error('Incorrect email')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)