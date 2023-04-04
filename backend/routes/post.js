const express = require('express')

const {
        createPost,
        getMyPosts,
        getPosts,
        comment,
        deleteComment,
        deletePost
} = require('../controllers/postController')

const requireAuth = require('../middleware/requireAuth')

//require route for all routes
const router = express.Router()

router.use(requireAuth)

//gets all posts
router.get('/', getPosts)


//get my post
router.get('/mypost', getMyPosts)

//make comment
router.post('/comment' , comment)

//delete comment
router.delete('/uncomment' , deleteComment)

//middleware variables
const multer = require('multer')
const path = require('path')
const filename = Date.now()

//storage middleware
const storage = multer.diskStorage({
        destination: (req, file, callback) => {
                console.log("File:" + file)
                callback(null, '../frontend/src/uploads')
        },
        filename: (req, file, callback) => {
                callback(null, filename + file.originalname)
                console.log("File:" + file.originalname)

        }
})

const upload = multer({ storage: storage })

//POST a posts
router.post('/', upload.single("NAME"), createPost)

//DELETE a posts
router.delete('/delete', deletePost)

module.exports = router