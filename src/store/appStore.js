import { observable, action } from 'mobx'
import { isAuthenticated, authenticateSuccess, logout } from '../util/Sessions'
import axios from 'axios'

class AppStore{
    // 通过访问本地9390端口的express服务器来获取数据，可以在package.json中做跨域处理
    // 在package.json中添加 "proxy":"http://localhost:9390" 可以实现express服务(3000)跨域访问mongodb服务(9093)
    @observable 
    sideMenu = []
    @observable
    openKey = []
    @observable
    selectedKeys = []
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
}

export default new AppStore()