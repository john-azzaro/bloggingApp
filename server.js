"use strict";

// import express and mongoose to make the following available to our application code.
// this would be for core functionality, and then as you add features you add additional imports.
    // NOTE: the reason why we can just put express is because its a node module.
const express = require("express");  
const mongoose = require('mongoose');
const morgan = require("morgan");


const app = express();


// From L2, 
// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const {PORT, DATABASE_URL} = require('./config');


mongoose.Promise = global.Promise;
const {BlogPost} = require("./models");


// common is the standard output format, asking how you want morgan to work.
// middleware comes right before routes, becuase routes is just a specialized form of middleware.
app.use(morgan('common'));
// this returns the json middleware
app.use(express.json());






// for each add internal server error

// sends back all posts to database.
app.get('/posts', (req, res) => {
    BlogPost.find().then(posts => {
        res.json(posts.map(post => post.serialize()));
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: err.message});
    });
});



// sends back a single blog post with :id if it exists, using schema below.
app.get('/posts/:id', (req, res) => {
    BlogPost.findById(req.params.id).then(post => {
        if (post) {
            res.json(post.serialize());
        } else {
            res.status(404).json({ message: 'not found'});
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: err.message});
    });
});


// endpoint for creating new blogposts.
app.post('/posts', (req, res) => {
    const {title, author, content} = req.body; 
    BlogPost.create({title, author, content}).then(post => {
        res.status(201).json(post.serialize());
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: err.message});
    });
});

// allows you to update title, author, and content fields.
app.put('/posts/:id', (req, res) => {});



// allows you to delete a post with a given id.
app.delete('/posts/:id', (req, res) => {
    // sends back nothing (204)
    BlogPost.findByIdAndDelete(req.params.id).then(res.status(204).end())
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: err.message});
    });
});








// connects to the database, then starts the server.
// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run



let server;

function runServer(databaseUrl, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}



// close server
// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
    return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }
  
  if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};