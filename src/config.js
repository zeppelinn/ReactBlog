import axios from 'axios';
import browserCookies from 'browser-cookies'

// 拦截请求
// 设置拦截器后，所有的请求都会被该函数拦截
axios.interceptors.request.use(config => {
    config.headers['User-Type'] = browserCookies.get("cortezx_blog_userid") ? browserCookies.get("cortezx_blog_userid") : '' // 请求头中存放用户信息
    config.headers['Hello-Cortezx'] = 'hello cortezx'
    return config;
})

// 拦截响应
axios.interceptors.response.use(config => {
    return config;
})

export const IPADDR = '192.168.0.101';