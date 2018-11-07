const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/my_test_blog"
// const DB_URL = "mongodb://127.0.0.1:41204/react-blog"
mongoose.connect(DB_URL);



// 侧边栏标签，最多三级
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

// 评论回复，包括 回复内容 回复发送者 回复接受者 以及发送回复者的_id（当前客户端中的cookie）
var replySchema = new mongoose.Schema({
    "content":{"type":String, require: true},
    "from":{"type":String, require: true},
    "to":{"type":String, require: true},
})

// 博客评论，包括 评论内容，评论下方回复以及评论人
var commentSchema = new mongoose.Schema({
    "content":{"type":String, require: true},
    "replies":[replySchema],
    "from":{"type":String, require: true},
})

// 博客内容，包括 标题、内容描述、正文内容、作者、发布时间以及评论
// 每条评论下面又关联了回复
var blogSchema = new mongoose.Schema({
    "key":{"type":String, require: true},
    "title":{'type':String, require:true},
    "content":{'type':String, require:true},
    "author":{'type':String, require:true},
    "createDate":{'type':Date, default: new Date().getTime()},
    "comments":[commentSchema]
})

// 未读消息 分为两种
// 1. 评论消息(comment)
// 2. 回复消息(reply)
// 评论或回复对应的博客URL
var unreadSchema = new mongoose.Schema({
    "type":{"type":String, require: true},
    "comment":{type:commentSchema},
    "reply":{type:replySchema},
    "blogTitle":{type:String},
    "blogURL":{type:String},
    "read":{"type":Boolean, default:false}
})

// 用户信息 包括用户名 密码 该用户发表的文章 未读的消息
var userSchema = new mongoose.Schema({
    "username":{'type':String, require:true},
    "password":{'type':String, require:true},
    "blog":[blogSchema],
    "unread":[unreadSchema]
})

// 侧边栏元数据
mongoose.model('metaSideNav', metaSideNavSchema)
// 用户数据
mongoose.model("user", userSchema)
// 用户未读消息
mongoose.model("unread", unreadSchema)
// 博客
mongoose.model("blog", blogSchema)
// 博客评论
mongoose.model("comment", commentSchema)
// 评论回复
mongoose.model("reply", replySchema)



var unreadTestSchema = new mongoose.Schema({
    content:{'type':String, require:true},
})
mongoose.model("unreadTest", unreadTestSchema)

var userTestSchema = new mongoose.Schema({
    username:{'type':String, require:true},
    unread:[unreadTestSchema]
})
mongoose.model("userTest", userTestSchema)


module.exports = {
    getModel: (name) => {
        return mongoose.model(name)
    }
}