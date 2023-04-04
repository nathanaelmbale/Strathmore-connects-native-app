const express = require('express')

//controller functions
const {
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
} = require('../controllers/userController')

const router = express.Router()

//login route
router.post('/login', loginUser)

//Signup route
router.post('/signup', signupUser)

//change password
router.patch('/password', changePassword)

//find userId
router.post('/find',userId)

//get notification
router.post('/notification', myNotification)

//add notification
router.post('/notification/add', userNotification)

//add admin
router.post('/add/admin', updateUserAdmin)

//remove admin
router.delete('/remove/admin', removeAdmin)

//Delete notification
router.delete('/notification/delete', DeleteNotification)


//Delete account
router.delete('/account/delete', DeleteAccount)

module.exports = router