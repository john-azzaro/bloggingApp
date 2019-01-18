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

// 
app.post('/posts', (req, res) => {});

app.put('/posts/:id', (req, res) => {});

app.delete('/posts/:id', (req, res) => {});

app.delete('/:id', (req, res) => {});