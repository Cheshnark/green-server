const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Image Schema
const imgSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Img', imgSchema);