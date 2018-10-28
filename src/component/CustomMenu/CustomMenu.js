import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { inject, observer } from 'mobx-react'

@withRouter @inject('appStore') @observer
class CustomMenu extends Component {
    constructor(props){
        super(props)
        this.onOpenChange = this.onOpenChange.bind(this)
        this.props.appStore.initSideMenu();
    }
    
    onOpenChange = (openKey) => {
        const lastKey = openKey[openKey.length - 1]
        switch (openKey.length) {
            case 0:
            case 1:
            case 2:
                this.props.appStore.openKey = openKey
                return 
            case 3:
                // 如果最后一个是 /home/android 或者 /home/antd 则收起android或者antd
                if(lastKey.split('/').length === 3){
                    this.props.appStore.openKey = [openKey[0], openKey[2]]
                    return 
                }
                break
            case 4:
                if(lastKey.split('/').length === 4){
                    openKey.splice(openKey.length - 2, 1)
                    this.props.appStore.openKey = openKey
                    return 
                }else if(lastKey.split('/').length === 3){
                    this.props.appStore.openKey = [openKey[0], openKey[3]]
                    return 
                }
                break
            case 5:
                if(lastKey.split('/').length === 3){
                    this.props.appStore.openKey = [openKey[0], openKey[openKey.length - 1]]
                    return 
                }else if(lastKey.split('/').length === 4){
                    openKey.splice(openKey.length - 2, 1)
                    this.props.appStore.openKey = openKey
                    return 
                }
                break
        }
        this.props.appStore.openKey = openKey
        
    }

    // 根据当前路由初始化侧边栏打开标签状态
    componentDidMount = () =>  {
        const pathname = this.props.location.pathname
        const openKey = this.getOpenPath(pathname)
        this.props.appStore.openKey = openKey
        this.props.appStore.selectedKeys = [pathname]
    }
    

    // 获取左侧导航应该打开的标签
    // 比如当前 pathname为 /home/android/base/broadcast 时
    // 得到的数组应该是
    // ["/home","/home/android","/home/android/base","/home/android/base/broadcast"]
    getOpenPath = (pathname) => {
        let array = pathname.split('/')
        let temp = []
        for (let i = 1; i < array.length; i++) {
            temp.push(array.slice().splice(0 ,i + 1).join('/'))
        }
        return temp
    }


    // 重新获取当前页面路由，并设置侧边栏打开级别
    componentWillReceiveProps = (nextProps) => {
        const pathname = nextProps.location.pathname
        if(this.props.location.pathname !== pathname){
            this.props.appStore.selectedKeys = [pathname]
        }
    }

    renderMenuItem = ({key, icon, title}) => {
        const Item = Menu.Item
        return (
            <Item key={key} >
                <Link to={key} >
                    {icon && <Icon type={icon} />}
                    <span className="nav-text">{title}</span>
                </Link>
            </Item>
        )
    }

    renderSubMenu = ({key, icon, title, subs}) => {
        const SubMenu = Menu.SubMenu
        return (
            <SubMenu key={key} title={<span>{icon && <Icon type={icon}/>}<span>{title}</span></span>}>
                {
                    subs && subs.slice().map(item => {
                        return item.subs && item.subs.slice().length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </SubMenu>
        )
    }

    render() {
        const { openKey, selectedKeys } = this.props.appStore
        return (
            <Menu
                inlineCollapsed={this.props.collapsed}
                onOpenChange={(openKey) => this.onOpenChange(openKey)}
                onClick={({key}) => this.props.appStore.selectedKeys = [key]} 
                openKeys={openKey}
                selectedKeys={selectedKeys}
                theme={this.props.theme ? this.props.theme : "dark"}
                mode="inline">
                {
                    this.props.appStore.sideMenu && this.props.appStore.sideMenu.slice().map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu>
        )
    }
}

export default CustomMenu