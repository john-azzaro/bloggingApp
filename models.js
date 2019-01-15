const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: { 
        firstName: String, lastName: String,
    },
    content: String, 
})