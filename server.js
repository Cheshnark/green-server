const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const Post = require('./models/postModel');
const User = require('./models/userModel');
const Img = require('./models/imgModel');


// Express app
const app = express();

// Mongoose configuration
mongoose.set('strictQuery', true);

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// Mongoose connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // Listen for requests
    let port = process.env.PORT;
    if(port == null || port ==""){
        port = 8000;
    }

    app.listen(port, () => {
        console.log(`Connected to database & server running on port ${port}`);
    })
})
.catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
})

// Routes
app.get('/', (req,res) => {
    res.json('hi');
});

// GET all posts
app.get('/blog', async (req,res) => {
    const posts = await Post.find({});
    res.status(200).json(posts)
});

// POST a post entry
app.post('/blog', async (req,res) => {
    const {title, body, author, url} = req.body;

    try {
        const post = await Post.create({title, body, author, url});
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
})

// GET a single post
app.get('/blog/:id', async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Post does not exist'});
    }

    const post = await Post.findById(id);

    if(!post) {
        return res.status(404).json({error: 'Post does not exist'});
    }

    res.status(200).json(post);
});

// POST user 
app.post('/users', async(req,res) => {
    const {name, email} = req.body;

    const user = await User.create({name, email});

    try {
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
    
})

//GET all images from the database
app.get('/img', async(req, res) => {
    const posts = await Img.find({});
    res.status(200).json(posts)
})

//POST an image to the database
app.post('/img', async (req,res) => {
    const {img, title} = req.body;

    try {
        const post = await Img.create({img, title});
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
})