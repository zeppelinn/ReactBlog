const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/my_test_blog"
mongoose.connect(DB_URL);

// 用户信息
var userSchema = new mongoose.Schema({
    "username":{'type':String, require:true},
    "password":{'type':String, require:true}
})
mongoose.model("user", userSchema)

var sideNavSubLevelThreechema = new mongoose.Schema({
    "key":{'type':String, require:true},
    "title":{'type':String, require:true},
    "icon":{'type':String, require:true},
})

var sideNavSubLevelTwochema = new mongoose.Schema({
    "key":{'type':String, require:true},
    "title":{'type':String, require:true},
    "icon":{'type':String, require:true},
    "subs":[sideNavSubLevelThreechema]
})

var sideNavSubLevelOnechema = new mongoose.Schema({
    "key":{'type':String, require:true},
    "title":{'type':String, require:true},
    "icon":{'type':String, require:true},
    "subs":[sideNavSubLevelTwochema]
})

var sideNavShema = new mongoose.Schema({
    "title":{'type':String, require:true},
    "icon":{'type':String, require:true},
    "key":{'type':String, require:true},
    "subs":[sideNavSubLevelOnechema]
})

var metaSideNavSchema = new mongoose.Schema({
    "meta":[sideNavShema],
})
mongoose.model('metaSideNav', metaSideNavSchema)

// 博客首页显示的章节 保存章节标题，章节描述，作者等信息
var blogChapterSchema = new mongoose.Schema({
    "chapTitle":{'type':String, require:true},
    "desc":{'type':String, require:true},
    "author":{'type':String, require:true},
    "date":{'type':Date, default: new Date().getTime()},
    // 关联章节中具体的文章内容，即blogItem
    "items":[{'type':mongoose.Schema.Types.ObjectId}],
})
mongoose.model("blogChapter", blogChapterSchema)

// 评论 保存评论内容、评论者和评论发布时间
var commentSchema = new mongoose.Schema({
    "date":{'type':Date, default: new Date().getTime()},
    "content":{'type':String, require:true},
    "from":{'type':String},
})
mongoose.model("comment", commentSchema)

// 评论组 保存一个复杂对象数组，数组元素类型为comment
var commentGroupSchema = new mongoose.Schema({
    "commentId":[commentSchema]
})
mongoose.model("commentGroup", commentGroupSchema)

// 具体文章内容 保存文章标题，具体内容以及关于本篇文章的所有评论组
var blogItemSchema = new mongoose.Schema({
    "subTitle":{'type':String, require:true},
    "content":{'type':String, require:true},
    // 评论组id，一篇文章可能有多组评论，每组评论又形成一个评论区
    "commentGroupIds":[{"type":mongoose.Schema.Types.ObjectId}]
})
mongoose.model('blogItem', blogItemSchema)

module.exports = {
    getModel: (name) => {
        return mongoose.model(name)
    }
}