import React, { Component } from 'react'
import { Icon, Badge, Dropdown, Menu, Modal } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import screenfull from 'screenfull'
import browserCookies from 'browser-cookies'

@withRouter @inject('appStore') @observer
class HeaderBar extends Component {
    state = {
        notify: 100,
        visible: false,
        avatar: require('./img/04.jpg'),
        icon: "arrow-alt"
    }

    constructor(props){
        super(props)
        this.updateState = this.updateState.bind()
        this.toggle = this.toggle.bind()
        this.screenfullToggle = this.screenfullToggle.bind()
        this.logout = this.logout.bind()
        this.login = this.login.bind()
    }

    updateState = (dict) => {
        if(!this) return 
        this.setState(dict)
    }


    componentDidMount = () => {
        // screenfull.onchange(() => {
        //     this.updateState({
        //         icon: screenfull.isFullscreen ? 'shrink' : 'arrows-alt'
        //     })
        // })
    }

    componentWillUnmount = () => {
        // screenfull.off('change')
    }

    toggle = () => {
        this.props.toggle()
    }

    screenfullToggle = () => {
        if(screenfull && screenfull.enabled){
            screenfull.toggle()
        }
    }

    // 退出登录，调用store的toggleLogin修改登录状态，删除cookie，并刷新页面
    logout = () => {
        this.props.appStore.handleLogout()
        this.props.history.push(this.props.location.pathname)
    }

    // 跳转到点击的未读消息的博客页面
    showBlog = (blogURL, unreadId) => {
        const mCookie = browserCookies.get("cortezx_blog_userid")
        if(mCookie && mCookie !== ''){
            const userId = mCookie.split(' ')[0]
            this.props.appStore.updateUnread({userId, unreadId})
            this.props.history.push(blogURL)
        }
    }

    login = () => {

    }

    render() {
        const {icon, visible, avatar} = this.state
        const {appStore, location, collapsed} = this.props

        const unLogin = (
            <div>
                <Link to={{pathname: '/login', state: {from: location}}} style={{ marginRight:"5px", textDecoration:"null", color: 'rgba(0, 0, 0, 0.65)'}}>登录/注册</Link>&nbsp;
                <img src={require('../../assets/img/defaultUser.jpg')} alt=""/>
            </div>
        )

        const dropdownMenu = (
              <div>
                  <Menu className="menu">
                      <Menu.ItemGroup title="用户中心" className="menu-group">
                          <Menu.Item><span onClick={() => this.logout()} >退出登录</span></Menu.Item>
                      </Menu.ItemGroup>
                  </Menu>
              </div>
        )

        const login = (
            <Dropdown overlay = {dropdownMenu} >
                <img src={avatar} alt="" onClick={() => this.updateState({visible:true})}/>    
            </Dropdown>
        )

        const unreadDropdownMenu = (
            <div>
                  <Menu className="menu">
                      <Menu.ItemGroup title="未读消息" className="menu-group">
                          {
                              this.props.appStore.unreadBrief.slice().map(item => (
                                    <Menu.Item key={item._id} onClick={() => this.showBlog(item.blogURL, item._id)} >
                                        {
                                            item.type === 'comment' ? 
                                            <div>
                                                {item.comment.from}&nbsp;&nbsp;在你的博客&nbsp;&nbsp;{item.blogTitle}&nbsp;&nbsp;留言了
                                            </div> :
                                            <div>
                                                {item.reply.from}&nbsp;&nbsp;在博客&nbsp;&nbsp;{item.blogTitle}&nbsp;&nbsp;回复了你
                                            </div>
                                        }
                                    </Menu.Item>
                              ))
                          }
                      </Menu.ItemGroup>
                  </Menu>
              </div>
        )

        const unreadTip = (
            <Dropdown overlay={unreadDropdownMenu} >
                <Icon type="notification"/>
            </Dropdown>
        )

        return (
            <div id='headerbar'>
                <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} className='trigger' onClick={this.toggle}/>
            <div style={{lineHeight: '64px', float: 'right'}}>
                <ul className='header-ul'>
                <li><Icon type={icon} onClick={this.screenfullToggle}/></li>
                <li>
                    {appStore.isLogin ? 
                        <Badge dot={this.props.appStore.unreadBrief.length !== 0} style={{marginLeft: 17}}>
                            {unreadTip}
                        </Badge> : 
                        null
                    }
                </li>
                <li>
                    {appStore.isLogin ? login : unLogin}
                </li>
                </ul>
            </div>
            </div>
        )
    }
}

export default HeaderBar