import React, { Component } from 'react'
import { Layout } from 'antd'
import SideNav from '../../component/SideNav/SideNav'
import ContentMain from '../../component/ContentMain/ContentMain'
import HeaderBar from '../../component/TopBar/HeaderBar';

const { Sider, Header, Content, Footer } = Layout

export default class Index extends Component {

    constructor(props){
        super(props)
        this.state = {
            collapsible: false
        }
        this.toggleCollapsible = this.toggleCollapsible.bind(this)
    }

    toggleCollapsible = () => {
        this.setState({
            collapsible: !this.state.collapsible
        })
    }

    render() {
        return (
            <div id="page" >
                <Layout>
                    <Sider collapsed={this.state.collapsible}
                            trigger={null}
                            collapsible={true}
                            defaultCollapsed={false}
                           >
                           <SideNav collapsed={this.state.collapsible} />
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: '0 16px'}}>
                            <HeaderBar collapsed={this.state.collapsible} toggle={() => this.toggleCollapsible()}/>
                        </Header>
                        <Content>
                            <ContentMain/>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>React-blog ©2018 Created by myheadisradio@gmail.com</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
