const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user')
const Blog = model.getModel('blog')
const MetaSideNav = model.getModel("metaSideNav")
const Comment = model.getModel('comment')
const Reply = model.getModel('reply')
const Unread = model.getModel('unread')

const utils = require('utility');


    const menu = [
    {
        title: '首页',
        icon:'home',
        key:'/home'
    },
    {
        title: 'Android',
        icon:'deployment-unit',
        key:'/home/android',
        subs:[
            {
                title: '基础',
                icon: 'bulb',
                key: '/home/android/base',
                subs:[
                    {
                        title: 'Activity',
                        icon: 'right-circle',
                        key: '/home/android/base/activity',
                    },
                    {
                        title: 'Service',
                        icon: 'right-circle',
                        key: '/home/android/base/service',
                    },
                    {
                        title: 'Broadcast',
                        icon: 'right-circle',
                        key: '/home/android/base/broadcast',
                    }
                ]
            },
            {
                title: '异步消息处理',
                icon: 'bulb',
                key: '/home/android/handlerandasynctask',
                subs:[
                    {
                        title: 'Handler',
                        icon:'right-circle',
                        key:'/home/android/handlerandasynctask/handler',
                    },
                    {
                        title: 'AsyncTask',
                        icon:'right-circle',
                        key:'/home/android/handlerandasynctask/asynctask',
                    }
                ]
            },
            {
                title: '开源框架介绍',
                icon: 'bulb',
                key: '/home/android/openSource',
                subs:[
                    {
                        title: 'OkHttp',
                        icon:'right-circle',
                        key:'/home/android/openSource/okhttp',
                    },
                    {
                        title: 'Retrofit',
                        icon:'right-circle',
                        key:'/home/android/openSource/retrofit',
                    },
                    {
                        title: 'RxJava',
                        icon:'right-circle',
                        key:'/home/android/openSource/rxjava',
                    },
                    {
                        title: 'Glide',
                        icon:'right-circle',
                        key:'/home/android/openSource/glide',
                    },
                    {
                        title: 'ButterKnife',
                        icon:'right-circle',
                        key:'/home/android/openSource/butterKnife',
                    }
                ]
            },
            {
                title: 'View绘制',
                icon: 'bulb',
                key: '/home/android/view',
                subs:[
                    {
                        title: 'View',
                        icon:'right-circle',
                        key:'/home/android/view/view',
                    },
                    {
                        title: 'FrameLayout',
                        icon:'right-circle',
                        key:'/home/android/view/frameLayout',
                    },
                ]
            },
            {
                title: 'Android异常与性能优化',
                icon: 'bulb',
                key: '/home/android/optimize',
                subs:[
                    {
                        title: 'ANR',
                        icon:'right-circle',
                        key:'/home/android/optimize/anr',
                    },
                    {
                        title: 'OOM',
                        icon:'right-circle',
                        key:'/home/android/optimize/oom',
                    },
                    {
                        title: 'Bitmap',
                        icon:'right-circle',
                        key:'/home/android/optimize/bitmap',
                    },
                    {
                        title: 'UI卡顿',
                        icon:'right-circle',
                        key:'/home/android/optimize/ui',
                    },
                    {
                        title: '内存泄露',
                        icon:'right-circle',
                        key:'/home/android/optimize/cacheLeak',
                    },
                    {
                        title: '内存管理',
                        icon:'right-circle',
                        key:'/home/android/optimize/cacheManage',
                    },
                    {
                        title: '冷启动优化',
                        icon:'right-circle',
                        key:'/home/android/optimize/coldStart',
                    },
                    {
                        title: '其他优化',
                        icon:'right-circle',
                        key:'/home/android/optimize/other',
                    },
                ]
            },
            {
                title: '热门前沿知识',
                icon: 'bulb',
                key: '/home/android/hot',
                subs:[
                    {
                        title: '架构设计模式',
                        icon: 'right-circle',
                        key: '/home/android/hot/structure',
                    },
                    {
                        title: 'Android热更新',
                        icon: 'right-circle',
                        key: '/home/android/hot/hotPatch',
                    },
                    {
                        title: '进程保活',
                        icon: 'right-circle',
                        key: '/home/android/hot/processKeepingAlive',
                    },
                    {
                        title: '其他',
                        icon: 'right-circle',
                        key: '/home/android/hot/other',
                    },
                ]
            },
            {
                title: 'Java高级技术',
                icon: 'bulb',
                key: '/home/android/advanced',
                subs:[
                    {
                        title: 'Socket',
                        icon: 'right-circle',
                        key: '/home/android/advanced/socket',
                    },
                    {
                        title: 'BIO/NIO',
                        icon: 'right-circle',
                        key: '/home/android/advanced/bioandnio',
                    },
                    {
                        title: '多线程',
                        icon: 'right-circle',
                        key: '/home/android/advanced/multiThread',
                    },
                    {
                        title: '异常相关',
                        icon: 'right-circle',
                        key: '/home/android/advanced/exception',
                    },
                    {
                        title: '注解',
                        icon: 'right-circle',
                        key: '/home/android/advanced/annotation',
                    },
                    {
                        title: 'Java类加载器',
                        icon: 'right-circle',
                        key: '/home/android/advanced/classloader',
                    },
                    {
                        title: '堆栈',
                        icon: 'right-circle',
                        key: '/home/android/advanced/stack',
                    },
                    {
                        title: '反射',
                        icon: 'right-circle',
                        key: '/home/android/advanced/reflection',
                    },
                ]
            },
            {
                title: 'Java设计模式',
                icon: 'bulb',
                key: '/home/android/designPattern',
                subs:[
                    {
                        title: '单例',
                        icon: 'right-circle',
                        key: '/home/android/designPattern/singleton',
                    },
                    {
                        title: 'Builder模式',
                        icon: 'right-circle',
                        key: '/home/android/designPattern/builder',
                    },
                    {
                        title: '适配器模式',
                        icon: 'right-circle',
                        key: '/home/android/designPattern/adapter',
                    },
                    {
                        title: '装饰模式',
                        icon: 'right-circle',
                        key: '/home/android/designPattern/decorator',
                    },
                    {
                        title: '外观模式',
                        icon: 'right-circle',
                        key: '/home/android/designPattern/facade',
                    },
                    {
                        title: '策略模式',
                        icon: 'right-circle',
                        key: '/home/android/designPattern/strategy',
                    },
                    {
                        title: '模板方法',
                        icon: 'right-circle',
                        key: '/home/android/designPattern/template',
                    },
                    {
                        title: '观察者模式',
                        icon: 'right-circle',
                        key: '/home/android/designPattern/observe',
                    },
                    {
                        title: '责任链模式',
                        icon: 'right-circle',
                        key: '/home/android/designPattern/response',
                    },
                ]
            },
            {
                title: 'Http&Https',
                icon: 'bulb',
                key: '/home/android/http',
                subs:[
                    {
                        title: 'Http',
                        icon: 'right-circle',
                        key: '/home/android/http/http',
                    },
                    {
                        title: 'Https',
                        icon: 'right-circle',
                        key: '/home/android/http/https',
                    }
                ]
            }
        ]
    },
    {
        title: 'Ant Design',
        icon:'deployment-unit',
        key:'/home/antd',
        subs:[
            {
                title: '基本组件',
                icon: 'laptop',
                key: '/home/antd/general',
                subs: [
                    {key: '/home/antd/general/button', title: '按钮', icon: '',},
                    {key: '/home/antd/general/icon', title: '图标', icon: '',},
                ]
                },
                {
                title: '导航组件',
                icon: 'bars',
                key: '/home/antd/navigation',
                subs: [
                    {key: '/home/antd/navigation/dropdown', title: '下拉菜单', icon: ''},
                    {key: '/home/antd/navigation/menu', title: '导航菜单', icon: ''},
                    {key: '/home/antd/navigation/steps', title: '步骤条', icon: ''},
                ]
                },
                {
                title: '输入组件',
                icon: 'edit',
                key: '/home/antd/entry',
                subs: [
                    {
                    key: '/home/antd/entry/form',
                    title: '表单',
                    icon: '',
                    subs: [
                        {key: '/home/antd/entry/form/basic-form', title: '基础表单', icon: ''},
                        {key: '/home/antd/entry/form/step-form', title: '分步表单', icon: ''}
                    ]
                    },
                    {key: '/home/antd/entry/upload', title: '上传', icon: ''},
                ]
                },
                {
                title: '显示组件',
                icon: 'desktop',
                key: '/home/antd/display',
                subs: [
                    {key: '/home/antd/display/carousel', title: '轮播图', icon: ''},
                    {key: '/home/antd/display/collapse', title: '折叠面板', icon: ''},
                    {key: '/home/antd/display/list', title: '列表', icon: ''},
                    {key: '/home/antd/display/table', title: '表格', icon: ''},
                    {key: '/home/antd/display/tabs', title: '标签页', icon: '',},
                ]
                },
                {
                title: '反馈组件',
                icon: 'message',
                key: '/home/antd/feedback',
                subs: [
                    {key: '/home/antd/feedback/modal', title: '对话框', icon: '',},
                    {key: '/home/antd/feedback/notification', title: '通知提醒框', icon: ''},
                    {key: '/home/antd/feedback/spin', title: '加载中', icon: '',}
                ]
                },
                {
                title: '其它',
                icon: 'bulb',
                key: '/home/antd/other',
                subs:[
                    {key: '/home/antd/other/animation', title: '动画', icon: '',},
                    {key: '/home/antd/other/gallery', title: '画廊', icon: '',},
                    {key: '/home/antd/other/draft',title:'富文本',icon:''},
                    {key: '/home/antd/other/chart',title:'图表',icon:''},
                    {key: '/home/antd/other/loading',title:'加载动画',icon:''},
                    {key: '/home/antd/other/404',title:'404',icon:''},
                    {key: '/home/antd/other/springText',title:'弹性文字',icon:''},
                ]
            },
        ]
    },
    {
        title: '关于',
        icon: 'info-circle-o',
        key: '/home/about'
    }
    ]

// 为数据库查询结果添加过滤条件，不显示加密的密码和版本号
const _filter = {pwd:0, '__v':0}

// 添加侧边栏导航标题以及路由
Router.get("/addSideNavInfo", (req, res) => {
    const metaSideNav = new MetaSideNav({"meta":menu})
    metaSideNav.save((err, doc) => {
        if(err) return res.json({msg:err})
        return res.json({doc, msg:"保存成功"})
    })
})

Router.get('/showSide', (req, res) => {
    MetaSideNav.find({}, (err, doc) => {
        if(err) return res.json({msg:err})
        return res.json(doc)
    })
})

Router.get('/showUsers', (req, res) => {
    User.find({}, (err, doc) => {
        return res.json(doc)
    })
})

Router.get("/removeAll", (req, res) => {
    User.remove({}, (err, doc) => {
        return res.json({doc})
    })
})

Router.get('/removeNav', (req, res) => {
    MetaSideNav.remove({}, (err, doc) => {
        if(err) return res.json({msg:err})
        return res.json(doc)
    })
})

Router.get('/getSideNav', (req, res) => {
    console.log('收到前端请求')
    MetaSideNav.find({}, (err, doc) => {
        if(err) return res.json({code:1})
        console.log('获取数据成功，发送给前端')
        return res.json({code:0, doc})
    })
})

// 处理注册信息，返回用户的cookie
Router.post('/register', (req, res) => {
    const {username, password} = req.body
    User.findOne({username}, (err, doc) => {
        if(err) return res.json({code:1, msg:"注册失败"})
        if(doc) return res.json({code:1, msg:"该用户已被注册，请尝试其他用户名"})
        const userModel = new User({username, password:md5Password(password)})
        userModel.save((err1, doc1) => {
            if(err1) return res.json({code:1, msg:"注册失败"})
            const {username, _id} = doc1;
            res.cookie('cortezx_blog_userid', doc1._id + " " + username);
            return res.json({code:0, data:{username, _id}})
        })
    })
})

// 处理用户登录，返回对应的cookie
Router.post('/login', (req, res) => {
    const {username, password} = req.body
    User.findOne({username, password:md5Password(password)}, _filter, (err, doc) => {
        if(err) return res.json({code: 1, msg:"登录失败，请重试"})
        if(!doc) return res.json({code: 1, msg:"用户不存在"})
        res.cookie("cortezx_blog_userid", doc._id + " " + username);
        return res.json({code:0, data:doc})
    })
})

// 上传新博客
Router.post("/newBlog", (req, res) => {
    const {key, title, content, author} = req.body
    const blog = new Blog({key, title, content, author})
    blog.save((err, doc) => {
        if(err) return res.json({code:1, msg:"文章保存失败"})
        return res.json({code:0})
    })
})

Router.get("/showBlogs", (req, res) => {
    Blog.find({}, (err, doc) => {
        return res.json({doc})
    })
})

Router.get("showUsers", (req, res) => {
    User.find({}, (err, doc) => {
        return res.json({doc})
    })
})

Router.get("/removeBlogs", (req, res) => {
    Blog.remove({}, (err, doc) => {
        return res.json({doc})
    })
})

// 获取某篇博客内容
// 客户端请求中包含当前博客的URL，找到博客文档后将文档内容和评论(前5条)等发送给客户端
Router.post("/showBlog", (req, res) => {
    const { key } = req.body
    Blog.findOne(key, (err, doc) => {
        if(err) return res.json({code:1, msg:err})
        return res.json({code:0, data:doc})
    })
})

// 查看更多评论
// 客户端请求更多评论，携带当前页面的URL 以及评论的页数
Router.post("/showMoreComment", (req, res) => {
    const { page, key } = req.body
    const start = (page - 1) * 5
    Blog.findOne({key}, {comments:{$slice:[start, start + 5]}}, (err, doc) => {
        if(err) return res.json({code:1})
        const comments = doc.comments
        return res.json({code:0, comments})
    })
})

// 刷新当前未读消息
// 客户端会把当前的未读消息数加到请求中
// 判断客户端请求中的未读数量与当前数据库中的未读数量是否一致
// 如果一致则返回一个标志位，避免流量消耗
Router.post('/freshUnread', (req, res) => {
    const { unreadNum, userId } = req.body
    User.findOne({"_id":userId}, (err, doc) => {
        // 异常处理
        if(err || !doc || !doc.unread) return res.json({code:1, msg:err, statu:1})
        // 如果没有新消息或者数据库中新消息数量为0，则返回空标识
        if(unreadNum === doc.unread.length || doc.unread.length === 0) return res.json({code:0, statu:0, msg:'没有新消息'})
        // 如果消息数量发生改变，则将数据发送给前端
        // 发送的数据包括未读数据的数量以及最近五个更新的未读消息
        const length = doc.unread.length
        const brief = length > 4 ? doc.unread.slice(length-6, length -1) : doc.unread
        return res.json({code:0, data:{length, brief}})
    })
})

// 用户点击某条未读消息之后，客户端根据未读消息中的URL跳转到对应路由
// 同时通知服务端将该条消息改为已读
Router.post('/updateOneUnread', (req, res) => {
    const { userId, type, unreadId } = req.body
    // UserTest.findOne({username:"lijun"},{"unread": {$elemMatch: { type, _id}}}, (err, doc) => {          //找到数组中的某一项
    // User.update({_id:userId}, {"$pull":{"unread":{type, "_id":unreadId}}}, (err, doc) => {
    User.updateOne({_id:userId,"unread._id":unreadId},{$set:{"unread.$.read":true}}, (err, doc) => {
        if(err) return res.json({code:1, msg:err})
        return res.json({code:0})
    })
})

// 查看历史消息
Router.post('/updateUnreads', (req, res) => {
    const {userId, page} = req.body
    const start = (page - 1) * 10
    User.findOne({_id:userId}, {unread:{$slice:[start, start + 10]}}, (err, doc) => {
        if(err) return res.json({code:1})
        return res.json({coed:0, data:doc})
    })
})

// 添加新评论
Router.post('/addNewComment', (req, res) => {
    const { blogURL, blogTitle, from, content, author } = req.body
    const comment = new Comment({content, from})
    comment.save((err, doc) => {
        if(err) return res.json({code:1})
        // 将最新的评论添加到对应博客 最新的评论会在数组的最前面
        Blog.findOneAndUpdate({key:blogURL}, {$push:{comments:{$each:[doc], $position:0}}}, {new:true}, (err1, doc1) => {
            if(err1) return res.json({code:1})
            // 评论添加到博客中后再将评论添加到博主的未读消息中
            const unread = new Unread({
                type:"comment",
                comment:doc,
                blogTitle,
                blogURL,
                read: false
            })
            // 更新博主的未读消息 与博客一样 最新的评论会放在数组最前面
            unread.save((err2, doc2) => {
                if(err2) return res.json({code:1})
                User.findOneAndUpdate({username: author}, {$push:{unread:{$each:[doc2], $position:0}}}, (err3, doc3) => {
                    if(err3) return res.json({code:1, msg:err3})
                    return res.json({code:0, data:doc1})
                })
            })
        })
    })
})

// 添加新回复
Router.post('/addNewReply', (req, res) => {
    const { blogURL, blogTitle, from, content, to, commentId } = req.body
    const reply = new Reply({content, from, to})
    // 保存回复文档，doc为保存过的回复文档对象
    reply.save((err, doc) => {
        if(err) return res.json({code:1, msg:err})
        // 更新博客中对应评论的回复，将该回复插入到回复数组的最前面 doc1为reply文档对象
        Blog.findOneAndUpdate({key:blogURL, "comments._id":commentId},{$push:{"comments.$.replies":{$each:[doc], $position:0}}},{ new:true }, (err1, doc1) => {
            if(err1) return res.json({code:2, msg:err1})
            // 添加unread文档对象
            const unread = new Unread({
                type:"reply",
                reply:doc,
                blogTitle,
                blogURL,
                read: false
            })
            unread.save((err2, doc2) => {
                if(err2) return res.json({code:3, msg:err2})
                User.findOneAndUpdate({username: to}, {$push:{unread:{$each:[doc2], $position:0}}}, (err3, doc3) => {
                    if(err3) return res.json({code:4, msg:err3})
                    return res.json({code:0, data:doc1})
                })
            })
        })
    })
})

const md5Password = (pwd) => {
    const salt = 'no_body_loves_me-6639*503u:˙∂∫åASF††£¡33SA*^@)FHAC9943';
    return utils.md5(utils.md5(pwd + salt));
}




const user = {
    username:"lijun",
}

const UserTest = model.getModel('userTest')
const UnreadTest = model.getModel('unreadTest')

Router.get("/commentTest", (req, res) => {
    const userTest = new UserTest(user)
    userTest.save((err, doc) => {
        return res.json(doc)
    })
})

Router.get('/commentTest/find', (req, res) => {
    UserTest.find({username:"lijun"}, {unread:{$slice:[20,33]}}, (err, doc) => {
        return res.json(doc)
    })
})

Router.get('/commentTest/show', (req, res) => {
    UserTest.find({username:"lijun"}, (err, doc) => {
        return res.json(doc)
    })
})

Router.get('/commentTest/remove', (req, res) => {
    // UserTest.find({username:"lijun"}, {unread:{$slice:[20,33]}}, (err, doc) => {
    //     return res.json(doc)
    // })
    UserTest.remove({}, (err, doc)=> {
        return res.json(doc)
    })
})

Router.get('/commentTest/update', (req, res) => {
    // { _id: 7, "grades.grade": 85 },
    UserTest.update({"username":"lijun","unread.content":"zzzz"},{$set:{"unread.$.content":"www"}}, (err, doc) => {
        return res.json(doc)
    })
})

Router.get('/commentTest/push', (req, res) => {
    UserTest.update({"username":"lijun"},{$push:{unread:{content:"new bbb"}}}, (err, doc) => {
        if(err) return res.json({err})
        return res.json(doc)
    })
})

Router.get('/commentTest/newpush', (req, res) => {
    const unreadTest = new UnreadTest({content:"hell ola ola ola ola "})
    unreadTest.save((err, doc) => {
        if(err) return res.json({err})
        // UserTest.updateOne({username:"lijun"}, {$push:{unread:doc}}, (err, doc) => {
        UserTest.updateOne({username:"lijun"}, {$push:{unread:{$each:[doc], $position:0}}}, (err, doc) => {
            if(err) return res.json({err})
            return res.json({doc})
        })
    })
    // UserTest.update({"username":"lijun"},{$push:{unread:{content:"new bbb"}}}, (err, doc) => {
    //     if(err) return res.json({err})
    //     return res.json(doc)
    // })
})

Router.get('/commentTest/unread', (req, res) => {
    UnreadTest.find({}, (err, doc) => {
        return res.json({doc})
    })
})


Router.get('/commentTest/findAndUpdate', (req, res) => {
    UnreadTest.findOneAndUpdate(
        {"content":"hsdfgsadoasdbviapsdbds"},
        {"$set":{"content":"update"}},
        {new: true},
        (err, doc) => {
            if(err) return res.json(err)
            return res.json(doc)
        }
    )
})

module.exports = Router