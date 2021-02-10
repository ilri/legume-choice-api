const express = require('express')
const router = express.Router();
const Post = require('../models/Post')

// Get all Posts
router.get('/',  async (req,res) => {
	//res.send('<h1>Legume-choice post<h1>')
	try{
		const posts = await Post.find().limit(5)
		res.json(posts)
	}catch(err){
		res.json({message: err});
	}
})

// Add a single post
router.post('/', async (req,res) => {
	//console.log(req.body)
	const post = new Post({
	name: req.body.name,
	description: req.body.description
	})

	try {
		const savedPost = await post.save()
		res.json(savedPost)

	}catch (err){
		res.json({message:err})

	}
})


// Find a Specific Post
router.get('/:postID', async (req, res) => {
	//console.log(req.params.postID)
	try{
		const post = await Post.findById(req.params.postID)
		res.json(post)
	}catch(err){
		res.json({message: err})
	}

})

module.exports = router
