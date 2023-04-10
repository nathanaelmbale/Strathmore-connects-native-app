const express = require('express')

const {
    createCommunity,
    updateCommunity,
    getCommunities,
    addUserToCommunity,
    removeAccountFromCommunity,
    deleteCommunity
} = require('../controllers/communityController')

const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//Middleware to authetify user this middle ware checks the validity of the user token
const requireAuth = async (req , res , next) => {

    //Verify authentification
    const { authorization } = req.headers 

    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    //Checks token by spliting the token 
    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user =  await User.findOne({_id}).select('_id')
        next()
    }catch(error){
        console.log(error);
        res.status(401).json({ error: "Request is not authorised"})
    }
}

//require route for all routes
const router = express.Router()

router.use(requireAuth)//this middle ware checks the validity of the user token

//gets all Communities
router.get('/', getCommunities)

//POST a Communities
router.post('/create', createCommunity)

//REMOVE user from community
router.post('/unjoin', removeAccountFromCommunity)

//ADD add user to community
router.post('/join' ,addUserToCommunity)

//Edit community
router.patch('/edit',updateCommunity)

//DELETE a Communities
router.delete('/delete', deleteCommunity)

module.exports = router;