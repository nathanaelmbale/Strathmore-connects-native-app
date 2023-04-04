const Community = require('../models/communityModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')


// get all the posts
const getCommunities = async (req, res) => {
    //get all communities and sort the starting from the most recent
    const community = await Community.find({}).sort({ createdAt: -1 })

    //send community as a response
    res.status(200).json(community)
}


//create a new Item
const createCommunity = async (req, res) => {

    //defines parameters for the data to be inputed in the database
    const { name, description } = req.body

    console.log(req.user)

    const user = await User.findOne({ _id: req.user })

    if (!user) throw Error('Invalid user account')

    const email = user.email

    //adds doc to db
    try {
        if (!name || !description) throw Error('Please input the required feidls')
        if (!email) throw Error('You need to use you email')
        //finds community by name given
        const existingCommunity = await Community.findOne({ name })

        //checks if community exits
        if (existingCommunity) {
            throw Error("Community already exists")
        } else {
            //adds the document to the datbase
            await Community.create({ name, description, email })

            //returns all communities
            const community = await Community.find({}).sort({ createdAt: -1 })

            res.status(200).json(community)
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

//edit community
const updateCommunity = async (req, res) => {

    //defines parameters for the data to be inputed in the database
    const { name, description, _id } = req.body;

    //update doc
    try {
        //finds the document and campares it and updates where change is needed
        const updatedCommunity = await Community.findByIdAndUpdate(
            _id,
            { name, description },
            { new: true }
        )

        res.status(200).json(updatedCommunity)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//add user to community
const addUserToCommunity = async (req, res) => {

    //defines parameters for the data to be inputed in the database
    console.log(req.body)
    const { _id, email } = req.body

    //update document
    try {
        const user = await User.findOne({ email: email })

        console.log(user)

        //checks if user exists
        if (!user) throw Error('User not found')

        
        //finds the document and campares it and updates where change is needed
        const community = await Community.findById(_id)
        
        console.log(community)
        
        if (!community) throw Error('Community not found')

        // add the user's email to the community's accounts array
        community.accounts.push(email)

        // save the updated community document to the database
        await community.save()

        return res.status(200).json({ message: 'User added to community successfully' })

    } catch (error) {
        return res.status(500).json({ error: 'Failed to add user' });
    }
}


//remove someone from community
const removeAccountFromCommunity = async (req, res) => {
    //defines parameters for the data to be inputed in the database
    const { communityId, accountId } = req.body

    if (!mongoose.Types.ObjectId.isValid(communityId)) {
        throw Error("Community is invalid")
    }

    if (!mongoose.Types.ObjectId.isValid(accountId)) {
        throw Error("Account is invalid")
    }

    try {
        //finds community by id
        const community = await Community.findById({ _id: communityId })

        //checks if community exists
        if (!community) {
            throw Error(`Community was not found`)
        }

        //declares the array for the account
        const accounts = community.accounts || []

        //finds the index of the account searched for
        const accountIndex = accounts.indexOf(accountId)

        //if the index is not found
        if (accountIndex === -1) {
            console.log(`Account with ID ${accountId} not found in community with ID ${_id}`)

            throw new Error('User is not part of the community');
        }
        //removes user
        accounts.splice(accountIndex, 1)

        //updates database
        await community.updateOne({ accounts })

        //sends the community updated
        res.send.status(200).json(community)

    } catch (error) {
        res.send({ error: error.message })
        console.log(`${error.message}`)
    }

}


//delete a Item
const deleteCommunity = async (req, res) => {
    //defines parameters for the data to be inputed in the database
    const { id } = req.body

    //checks the validity of the Id 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Community not found" })
    }

    //finds community by id
    const community = await Community.findById({ _id: id }).sort({ createdAt: -1 })

    //checks if community exists
    if (!community) {
        throw Error("Community not found")
    }

    //removes community
    await community.remove()

    //fnds communities and sorts 
    const communities = await Community.find({}).sort({ createdAt: -1 })

    res.status(200).json(communities)
    console.log("community was deleted")
}



module.exports = {
    createCommunity,
    getCommunities,
    updateCommunity,
    addUserToCommunity,
    removeAccountFromCommunity,
    deleteCommunity
}