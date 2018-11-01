import { observable, action } from 'mobx'
import axios from 'axios';
import browserCookies from 'browser-cookies'

class UserStore{
    // 初始化时判断本地是否存在cookie，如果存在cookie则说明已经登录
    @observable isLogin = browserCookies.get('cortezx_blog_userid') ? true : false

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

export default new UserStore()