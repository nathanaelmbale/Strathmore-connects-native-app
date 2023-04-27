const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


//create token jwt token
const createToken = (_id) => {
    //which expires in 30 days
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '30d' })
}

// logs in user 
const loginUser = async (req, res) => {
    // extract email and password from request body
    const { email, password } = req.body

    // log to console for debugging
    console.log("login request body:", req.body)

    try {
        // try to log in user using email and password
        const user = await User.login(email, password)

        // log email and password to console for debugging
        console.log(email, password)

        // create JWT token for user
        const token = createToken(user._id)

        // extract user name and send JSON response with user info and JWT token
        const name = user.name

        res.status(200).json({
            email,
            name,
            token,
            admin: user.admin,
            _id: user._id,
            notifications : user.notification
        })

    } catch (error) {
        // send JSON response with error message
        res.status(400).json({ message: error.message })
    }

}

// get user ID by email
const userId = async (req, res) => {
    // extract email from request body
    const { email } = req.body

    // log to console for debugging
    console.log("user by email request body:", req.body)

    try {
        // find user by email using User model
        const user = await User.findOne({ email: email })

        // if user is not found, send JSON response with error message
        if (!user) res.status(400).json("User not found")

        // send JSON response with user ID
        res.status(200).json({ userId: user })

    } catch (error) {
        // send JSON response with error message
        res.status(400).json({ error: error.message })
    }

}

//signup user or store
const signupUser = async (req, res) => {
    const { name, email, password } = req.body
    // log to console for debugging
    console.log("Sign up request body:", req.body)

    try {
        const user = await User.signup(name, email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({
            email,
            token,
            name,
            admin: user.admin,
            _id: user._id,
            notifications : user.notification
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//change passowrd
const changePassword = async (req, res) => {

    const { email, password } = req.body;

        // log to console for debugging
        console.log("changePassword request body:",req.body)

    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await User.findOneAndUpdate(
            { email: email },
            { password: hash },
            { new: true } // This returns the updated document
        );

        if (!user) {
            throw Error('User not found');
        }

        return res.status(200).json('Password updated successfully');
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}


//notification
const myNotification = async (req, res) => {
    const { email } = req.body

    //log the request body for debugging
    console.log("Notifications request body:",req.body)


    try {
        const user = await User.findOne({ email })

        if (!user) {
            throw Error('Couldnt find an email')
        }

        res.status(200).json({ email: user.email, notifications: user.notification })

    } catch (error) {

        res.status(400).json({ message: error.message })
    }
}

//Create a user notification
const userNotification = async (req, res) => {
    //notification is the id of the post
    const { _id, notificationId, title, description } = req.body

    //log the request body for debugging
    console.log("userNotification request body:",req.body)

    try {
        const user = await User.findById({ _id: _id })

        if (!user) {
            throw Error('Invalid user')
        }

        // create new notification object
        const newNotification = {
            _id: notificationId,
            title: title,
            description: description
        }

        // add notification object to user document
        user.notification.push(newNotification);

        // save changes to database
        await user.save()

        res.status(200).json({ email: user.email, notification: user.notification })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//delete notification
const DeleteNotification = async (req, res) => {

    const { email, notificationId } = req.body

    //log the request body for debugging
    console.log("DeleteNotification request body:",req.body)

    try {
        const user = await User.findOne({ email: email })

        if (!user) {
            throw new Error('User not found');
        }

        console.log(user)
        // find index of notification with given ID
        const index = user.notification.findIndex(n => n._id.toString() === notificationId);
        if (index === -1) {
            throw new Error('Notification not found');
        }

        // remove notification from array
        user.notification.splice(index, 1)

        // save changes to database
        await user.save();

        res.status(200).json({ email: user.email, notifications: user.notification });

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

//delete account 
const DeleteAccount = async (req, res) => {
    const { email } = req.body
    
    //log the request body for debugging
    console.log("DeleteAccount request body:",req.body)

    try {
        // find user by email
        const user = await User.findOne({ email: email })

        if (!user) {
            throw new Error('User not found');
        }



        //  the email matches the email on the schema
        if (user.email === email) {
            const deleted = await User.deleteOne({ email })
            res.status(200).json('User deleted successfully')
        }

        //check if user is an admin 
        if (user.admin === true) {
            const deleted = await User.deleteOne({ email })
            res.status(200).json('User deleted successfully')
        }

        // delete user document from database
        throw Error('Access denied')

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//make one an admin
const updateUserAdmin = async (req, res) => {
    const { email, admin } = req.body

    //log the request body for debugging
    console.log("updateUserAdmin request body:",req.body)

    try {
        const user = await User.findByEmail(email)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        user.admin = admin
        await user.save()
        console.log(user)
        res.status(200).json(user.email)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//remove admin
const removeAdmin = async (req, res) => {
    const { email } = req.body

    //log the request body for debugging
    console.log("removeAdmin request body:",req.body)

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json('User not found')
        }

        // remove the admin property
        user.admin = undefined

        await user.save()

        res.status(200).json(`Admin removed ${user.email} successfully`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


module.exports = {
    loginUser,
    signupUser,
    userId,
    changePassword,
    myNotification,
    userNotification,
    updateUserAdmin,
    removeAdmin,
    DeleteNotification,
    DeleteAccount
}