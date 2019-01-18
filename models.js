const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: { 
        firstName: String, 
        lastName: String,
    },
    content: String, 
});

blogPostSchema.virtual("authorName").get(function() {
    return `${this.author.firstName} ${this.author.lastName}`.trim();
})


// below we take blogpostschema, adding a serialize to its methods
blogPostSchema.methods.serialize = function() {
    return {
            title: this.title, 
            content: this.content,
            author: this.authorName,
            created: this._id.getTimestamp(),
            id: this._id,    
    }
}

// always make the collection name the same as the model name.
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = {BlogPost}