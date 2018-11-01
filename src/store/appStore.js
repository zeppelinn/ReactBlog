import { observable, action } from 'mobx'
import { isAuthenticated, authenticateSuccess, logout } from '../utils/Sessions'
import axios from 'axios'

class AppStore{
    // 通过访问本地9390端口的express服务器来获取数据，可以在package.json中做跨域处理
    // 在package.json中添加 "proxy":"http://localhost:9390" 可以实现express服务(3000)跨域访问mongodb服务(9093)

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

    @action
    uploadNewBlog = ({key, title, content, author}) => {
        axios.post('/blog/newBlog', {key, title, content, author})
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    console.log('保存新文章成功')
                }
            })
    }

    @action
    showBlog = ({key}) => {
        axios.post("/blog/showBlog", {key})
            .then(res => {
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

}

export default new AppStore()