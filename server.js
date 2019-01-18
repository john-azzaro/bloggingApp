"use strict";

 // the reason why we can just put express is because its a node module.
const express = require("express");  
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;
const {BlogPost} = require("./models");



// sends back all posts to database.
app.get('/posts', (req, res) => {});

// sends back a single blog post with :id if it exists, using schema below.
app.get('/posts/:id', (req, res) => {});

// blog post schema
BlogPost.create({});



// endpoint for creating new blogposts.
app.post('/posts', (req, res) => {});

// allows you to update title, author, and content fields.
app.put('/posts/:id', (req, res) => {});



// allows you to delete a post.
app.delete('/:id', (req, res) => {});

// allows you to delete a post with a given id.
app.delete('/posts/:id', (req, res) => {});

