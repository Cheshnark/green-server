const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Post Schema
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String, 
        required: true
    } 
});

module.exports = mongoose.model('Post', postSchema);