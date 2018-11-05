import { observable, action } from 'mobx'
import axios from 'axios'
import browserCookies from 'browser-cookies'

class AppStore{
    // 通过访问本地9390端口的express服务器来获取数据，可以在package.json中做跨域处理
    // 在package.json中添加 "proxy":"http://localhost:9390" 可以实现express服务(3000)跨域访问mongodb服务(9093)

    // 初始化时判断本地是否存在cookie，如果存在cookie则说明已经登录
    @observable isLogin = browserCookies.get('cortezx_blog_userid') ? true : false

    // 侧边栏数据
    @observable sideMenu = []
    // 当前侧边啦打开的标签
    @observable openKey = []
    // 当前侧边栏选中的标签
    @observable selectedKeys = []
    // 博客URL
    @observable blogKey = ""
    // 博客文章标题
    @observable blogTitle = ""
    // 博客内容
    @observable blogContent = ""
    // 博客创建时间
    @observable blogCreateTime = null
    // 博客作者
    @observable blogAuthor = ""
    // 博客评论
    @observable blogComments = []
    // 加载状态
    @observable loading = false
    // 简单消息
    @observable unreadBrief = []

    @action
    initSideMenu = () => {
        // 使用axios请求服务端
        axios.get('/blog/getSideNav')
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    // 请求到侧边栏数据，更新sideMenu
                    this.sideMenu = res.data.doc[0].meta
                }
            })
    }

    // 上传新博客
    @action
    uploadNewBlog = ({key, title, content, author}) => {
        axios.post('/blog/newBlog', {key, title, content, author})
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    console.log('保存新文章成功')
                }
            })
    }

    // 进入博客 展示博客内容 评论 回复等内容
    @action
    showBlog = (key) => {
        this.loading = true
        axios.post("/blog/showBlog", {key})
            .then(res => {
                this.loading = false
                if(res.status === 200 && res.data.code === 0){
                    this.blogKey = res.data.data.key
                    this.blogTitle = res.data.data.title
                    this.blogContent = res.data.data.content
                    this.blogCreateTime = res.data.data.createDate
                    this.blogAuthor = res.data.data.author
                    this.blogComments = res.data.data.comments
                }
            })
    }

    @action
    showUnread = ({userId}) => {
        axios.post('/blog/freshUnread', {userId})
            .then(res => {
                console.log('freshUnread--->', res)
                if(res.status === 200 && res.data.code === 0 && res.data.data.statu === 1){
                    const data = res.data.data
                    const {brief, statu} = data
                    if(statu === 1 && brief){
                        this.unreadBrief = brief
                    }
                }else{
                    this.unreadBrief = []
                }
            })
    }

    @action
    updateUnread = ({userId, unreadId}) => {
        axios.post("/blog/updateOneUnread", {userId, unreadId})
            .then(res => {
                console.log('updateOneUnread--->', res)
            })
    }

    // 提交新的评论 如果后端提交新评论成功则修改blogComments通知前端页面修改
    @action
    uploadComment = ({ from, content }) => {
        axios.post("/blog/addNewComment", {blogURL:this.blogKey, blogTitle:this.blogTitle, from, content, author:this.blogAuthor})
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    console.log('newcomment--->', res.data.data.comments)
                    this.blogComments = res.data.data.comments
                }
            })
    }

    // 提交新回复 后端将新回复更新后返回带有新的回复的评论 前端同步更新
    @action
    uploadReply = ({ from, content, to, commentId }) => {
        axios.post('/blog/addNewReply', {blogURL:this.blogKey, blogTitle:this.blogTitle, from, content, to, commentId})
        .then(res => {
            if(res.status === 200 && res.data.code === 0){
                this.blogComments = res.data.data.comments
            }
        })
    }

    // 处理登录操作
    @action
    handleLogin = ({username, password}) => {
        return new Promise((resolve, reject) => {
            axios.post('/blog/login', {username, password})
                .then(res => {
                    if(res.status === 200 && res.data.code === 0){
                        console.log('store登录成功', res.data)
                        this.isLogin = true
                        resolve()
                    }else if(res.status === 200 && res.data.code === 1){
                        console.log('store登录失败', res.data.msg)
                        this.isLogin = false
                        reject(res.data.msg)
                    }else{
                        console.log('登录失败，请稍后再试')
                        this.isLogin = false
                        reject('登录失败，请稍后再试')
                    }
                })
        })
    }

    // 处理注册操作
    @action
    handleRegister = ({username, password}) => {
        console.log('store handleRegister')
        return new Promise((resovle, reject) => {
            axios.post('/blog/register', {username, password})
                .then(res => {
                    if(res.status === 200 && res.data.code === 0){
                        console.log('store注册成功', res.data)
                        resovle(res.data.username)
                    }else if(res.status === 200 && res.data.code === 1){
                        console.log('store注册失败', res.data.msg)
                        reject(res.data.msg)
                    }else{
                        console.log('注册失败，请稍后再试')
                        reject('注册失败，请稍后再试')
                    }
                })
        })
    }

    @action
    handleLogout = () => {
        this.isLogin = false
        browserCookies.erase('cortezx_blog_userid')
    }
    
}

export default new AppStore()