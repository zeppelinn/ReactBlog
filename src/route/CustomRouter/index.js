import React from 'react'
import { Route, Redirect, } from 'react-router-dom'
import BrowserCookies from 'browser-cookies'

// 已经登录的情况下再进入登录页就重定位到首页
const CustomRouter = ({component: Component,path, ...rest}) => (
    <Route {...rest} render={(props) => (
        path === '/login' && BrowserCookies.get("cortezx_blog_userid")
        ?<Redirect to={{
          pathname: '/',
          state: {from: props.location}
        }}/>
        :<Component {...props} />
    )}/>
)
export default CustomRouter