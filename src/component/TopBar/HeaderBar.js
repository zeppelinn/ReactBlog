import React, { Component } from 'react'
import { Icon, Badge, Dropdown, Menu, Modal } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import screenfull from 'screenfull'

@withRouter @inject('userStore') @observer
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
        this.props.userStore.handleLogout()
        this.props.history.push(this.props.location.pathname)
    }

    login = () => {

    }

    render() {
        const {icon, count, visible, avatar} = this.state
        const {userStore, location, collapsed} = this.props

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

        return (
          <div id='headerbar'>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} className='trigger' onClick={this.toggle}/>
          <div style={{lineHeight: '64px', float: 'right'}}>
            <ul className='header-ul'>
              <li><Icon type={icon} onClick={this.screenfullToggle}/></li>
              <li onClick={() => this.setState({count: 0})}>
                <Badge count={userStore.isLogin ? count : 0} overflowCount={99} style={{marginLeft: 17}}>
                  <Icon type="notification"/>
                </Badge>
              </li>
              <li>
                {userStore.isLogin ? login : unLogin}
              </li>
            </ul>
          </div>
          <Modal
            footer={null} closable={false}
            visible={visible}
            wrapClassName="vertical-center-modal"
            onCancel={() => this.setState({visible: false})}>
            <img src={avatar} alt="" width='100%'/>
          </Modal>
        </div>
        )
    }
}

export default HeaderBar