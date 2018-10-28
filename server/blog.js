const express = require('express');
const Router = express.Router();
const model = require('./model');
const BlogChapter = model.getModel('blogChapter')
const BlogItem = model.getModel('blogItem')
const User = model.getModel('user')
const Comment = model.getModel('comment')
const MetaSideNav = model.getModel("metaSideNav")
// const SideNav = model.getModel('sideNav')
// const SideNavLevelOne = model.getModel('sideNavSubLevelOne')
// const SideNavLevelTwo = model.getModel('sideNavSubLevelTwo')

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

Router.get('/remove', (req, res) => {
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
        const userModel = new User({username, password:md5Password(password)});
        userModel.save((err1, doc1) => {
            if(err1) return res.json({code:1, msg:"注册失败"})
            const {username, _id} = doc1;
            res.cookie('userid', doc1._id);
            return res.json({code:0, data:{username, _id}})
        })
    })
})

// 处理用户登录，返回对应的cookie
Router.post('/login', (req, res) => {
    const {username, password} = req.body
    User.findOne({username, password:md5Password(password)}, _filter, (err, doc) => {
        if(err) return res.json("登录失败，请重试")
        if(!doc) return res.json("用户不存在")
        res.cookie("userid", doc._id);
        return res.json({code:0, data:doc})
    })
})

const md5Password = (pwd) => {
    const salt = 'no_body_loves_me-6639*503u:˙∂∫åASF††£¡33SA*^@)FHAC9943';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router