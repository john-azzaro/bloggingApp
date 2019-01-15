const express = require("express");   // the reason why we can just put express is becasue its a node module.
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const {BlogPost} = require("./models");