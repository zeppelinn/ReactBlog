import React, { Component } from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import CustomRouter from '../../route/CustomRouter'

// 懒加载
const Home = LoadableComponent(() => import('../../route/Home/index'))

//基本组件Demo
const ButtonDemo = LoadableComponent(()=>import('../../route/General/ButtonDemo/index'))
const IconDemo = LoadableComponent(()=>import('../../route/General/IconDemo/index'))
//导航组件Demo
const DropdownDemo = LoadableComponent(()=>import('../../route/Navigation/DropdownDemo/index'))
const MenuDemo = LoadableComponent(()=>import('../../route/Navigation/MenuDemo/index'))
const StepsDemo = LoadableComponent(()=>import('../../route/Navigation/StepsDemo/index'))

//输入组件Demo
const FormDemo1 = LoadableComponent(()=>import('../../route/Entry/FormDemo/FormDemo1'))
const FormDemo2 = LoadableComponent(()=>import('../../route/Entry/FormDemo/FormDemo2'))
const UploadDemo = LoadableComponent(()=>import('../../route/Entry/UploadDemo/index'))

//显示组件Demo
const CarouselDemo = LoadableComponent(()=>import('../../route/Display/CarouselDemo/index'))
const CollapseDemo = LoadableComponent(()=>import('../../route/Display/CollapseDemo/index'))
const ListDemo = LoadableComponent(()=>import('../../route/Display/ListDemo/index'))
const TableDemo = LoadableComponent(()=>import('../../route/Display/TableDemo/index'))
const TabsDemo = LoadableComponent(()=>import('../../route/Display/TabsDemo/index'))

//反馈组件Demo
const SpinDemo = LoadableComponent(()=>import('../../route/Feedback/SpinDemo/index'))
const ModalDemo = LoadableComponent(()=>import('../../route/Feedback/ModalDemo/index'))
const NotificationDemo = LoadableComponent(()=>import('../../route/Feedback/NotificationDemo/index'))

//其它
const AnimationDemo = LoadableComponent(()=>import('../../route/Other/AnimationDemo/index'))
const GalleryDemo = LoadableComponent(()=>import('../../route/Other/GalleryDemo/index'))
const DraftDemo = LoadableComponent(()=>import('../../route/Other/DraftDemo/index'))
const BlogItem = LoadableComponent(()=>import('../../route/Other/BlogItem/index'))
const ErrorPage = LoadableComponent(()=>import('../../route/Other/ErrorPage/index'))
const SpringText = LoadableComponent(()=>import('../../route/Other/SpringText/index'))
//关于
const About = LoadableComponent(()=>import('../../route/About/index'))


const AddNewBlog = LoadableComponent(()=>import('../../route/AddNewBlog/index'))

export default class ContentMain extends Component {
    render() {
        return (
            <div style={{padding: 16, position: 'relative'}}>
                <Switch>
                    <CustomRouter exact path='/home' component={Home}/>
                    <CustomRouter exact path='/home/antd/general/button' component={ButtonDemo}/>
                    <CustomRouter exact path='/home/antd/general/icon' component={IconDemo}/>

                    <CustomRouter exact path='/home/antd/navigation/dropdown' component={DropdownDemo}/>
                    <CustomRouter exact path='/home/antd/navigation/menu' component={MenuDemo}/>
                    <CustomRouter exact path='/home/antd/navigation/steps' component={StepsDemo}/>

                    <CustomRouter exact path='/home/antd/entry/form/basic-form' component={FormDemo1}/>
                    <CustomRouter exact path='/home/antd/entry/form/step-form' component={FormDemo2}/>
                    <CustomRouter exact path='/home/antd/entry/upload' component={UploadDemo}/>

                    <CustomRouter exact path='/home/antd/display/carousel' component={CarouselDemo}/>
                    <CustomRouter exact path='/home/antd/display/collapse' component={CollapseDemo}/>
                    <CustomRouter exact path='/home/antd/display/list' component={ListDemo}/>
                    <CustomRouter exact path='/home/antd/display/table' component={TableDemo}/>
                    <CustomRouter exact path='/home/antd/display/tabs' component={TabsDemo}/>

                    <CustomRouter exact path='/home/antd/feedback/modal' component={ModalDemo}/>
                    <CustomRouter exact path='/home/antd/feedback/notification' component={NotificationDemo}/>
                    <CustomRouter exact path='/home/antd/feedback/spin' component={SpinDemo}/>

                    <CustomRouter exact path='/home/antd/other/animation' component={AnimationDemo}/>
                    <CustomRouter exact path='/home/antd/other/gallery' component={GalleryDemo}/>
                    <CustomRouter exact path='/home/antd/other/draft' component={DraftDemo}/>
                    <CustomRouter exact path='/home/antd/other/chart' component={BlogItem}/>
                    <CustomRouter exact path='/home/antd/other/404' component={ErrorPage}/>
                    <CustomRouter exact path='/home/antd/other/springText' component={SpringText}/>
                    <CustomRouter exact path='/home/addNewBlog' component={AddNewBlog}/>
                    <CustomRouter exact path='/home/about' component={About}/>
                    <Redirect exact from='/' to='/home'/>
                </Switch>
            </div>
        )
    }
}
