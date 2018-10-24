const express = require('express');
const Router = express.Router();
const model = require('./model');
const BlogChapter = model.getModel('blogChapter')
const BlogItem = model.getModel('blogItem')
const User = model.getModel('user')
const Comment = model.getModel('comment')




module.exports = Router