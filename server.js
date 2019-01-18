"use strict";

 // the reason why we can just put express is because its a node module.
const express = require("express");  
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;
const {BlogPost} = require("./models");