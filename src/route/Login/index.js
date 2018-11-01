import React, { Component } from 'react'
import BGParticle from '../../utils/BGParticle'
import { Form, Input, Row, Col, notification, message } from 'antd'
import './style.css'
import { randomNum, calculateWidth } from '../../utils/utils'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react/index'
import Loading from '../../component/Loading'
import {preloadingImages} from '../../utils/utils'
import "animate.css"
import { spawn } from 'child_process';

const url = 'https://raw.githubusercontent.com/zeppelinn/mac_desktop/master/EI_Capitan_night.jpg'

@withRouter @inject('userStore') @observer @Form.create()
class LoginView extends Component{

    state = {
        focusItem: -1,   //保存当前聚焦的input
        code: ''         //验证码
    }

    constructor(props){
        super(props)
        this.handleLogin = this.handleLogin.bind()
        this.formCode = this.formCode.bind()
        this.goToRegister = this.goToRegister.bind()
        this.updateState = this.updateState.bind()
    }

    componentDidMount = () => {
        this.formCode()
    }
    
    goToRegister = () => {
        console.log('gobackregister')

        this.props.switchShowBox('register')
        setTimeout(() => this.props.form.resetFields(), 500)
    }

    formCode = () => {
        const ctx = this.canvas.getContext('2d')
        const chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        let code = ''
        ctx.clearRect(0, 0, 80, 39)
        for (let i = 0; i < 4; i++) {
          const char = chars[randomNum(0, 57)]
          code += char
          ctx.font = randomNum(20, 25) + 'px SimHei'  //设置字体随机大小
          ctx.fillStyle = '#D3D7F7'
          ctx.textBaseline = 'middle'
          ctx.shadowOffsetX = randomNum(-3, 3)
          ctx.shadowOffsetY = randomNum(-3, 3)
          ctx.shadowBlur = randomNum(-3, 3)
          ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
          let x = 80 / 5 * (i + 1)
          let y = 39 / 2
          let deg = randomNum(-25, 25)
          /**设置旋转角度和坐标原点**/
          ctx.translate(x, y)
          ctx.rotate(deg * Math.PI / 180)
          ctx.fillText(char, 0, 0)
          /**恢复旋转角度和坐标原点**/
          ctx.rotate(-deg * Math.PI / 180)
          ctx.translate(-x, -y)
        }
        this.setState({
          code
        })
      }

    updateState = (dict) => {
        if(!this) return 
        this.setState(dict)
    }

    handleLogin = (e) => {
        console.log('handlelogin')
        e.preventDefault()
        this.updateState({
            focusItem: -1
        })
        const username = this.props.form.getFieldValue('username')
        const password = this.props.form.getFieldValue('password')
        const verification = this.props.form.getFieldValue("verification")
        if(verification && verification.toUpperCase() === this.state.code.toUpperCase()){
            this.props.userStore.handleLogin({username, password})
                .then(() => {
                    // 登录成功 跳转首页
                    const {from} = this.props.location.state || {from: {pathname: '/'}}
                    this.props.history.push(from)
                })
                .catch(error => {
                    // 处理登录失败情况
                    this.props.form.setFields({
                        username: {
                            value: username,
                            errors: [new Error('用户名不存在')]
                        }
                    })
                })
        }else{
            this.props.form.setFields({
                verification: {
                    value: verification,
                    errors: [new Error('验证码错误')]
                }
            })
        }
    }

    render = () => {
        const { getFieldDecorator, getFieldError } = this.props.form
        const { focusItem, code } = this.state
        const Item = Form.Item
        return(
            <div className={this.props.classname}>
                <h3 className="title">登录</h3>
                <Form onSubmit={(e) => this.handleLogin(e)} >
                    <Item help={getFieldError('username')}>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: "请输入用户名"}]
                        })(
                            <Input
                                onFocus={() => this.updateState({focusItem: 0})}
                                onBlur={() => this.updateState({focusItem: -1})}
                                maxLength={16}
                                placeholder='用户名'
                                addonBefore={<span className='iconfont icon-User' style={focusItem === 0 ? styles.focus : {}}/>}
                            />
                        )}
                    </Item>
                    <Item help={getFieldError('password')}>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入密码'}]
                        })(
                            <Input
                                onFocus={() => this.updateState({focusItem: 1})}
                                onBlur={() => this.updateState({focusItem: -1})}
                                type="password"
                                maxLength={16}
                                placeholder="密码"
                                addonBefore={<span className='iconfont icon-suo1' style={focusItem === 1 ? styles.focus : {}}/>}
                            />
                        )}
                    </Item>
                    <Item help={getFieldError('verification')}>
                        {getFieldDecorator('verification', {
                        validateFirst: true,
                        rules: [
                            {required: true, message: '请输入验证码'},
                            {
                            validator: (rule, value, callback) => {
                                if (value.length >= 4 && code.toUpperCase() !== value.toUpperCase()) {
                                callback('验证码错误')
                                }
                                callback()
                            }
                            }
                        ]
                        })(
                        <Row>
                            <Col span={15}>
                            <Input
                                onFocus={() => this.setState({focusItem: 2})}
                                onBlur={() => this.setState({focusItem: -1})}
                                maxLength={4}
                                placeholder='验证码'
                                addonBefore={<span className='iconfont icon-securityCode-b'
                                                style={focusItem === 2 ? styles.focus : {}}/>}/>
                            </Col>
                            <Col span={9}>
                            <canvas onClick={this.createCode} width="80" height='39' ref={el => this.canvas = el}/>
                            </Col>
                        </Row>
                        )}
                    </Item>
                    <div className='bottom'>
                        <input className='loginBtn' type="submit" value='登录'/>
                        <span className='registerBtn' onClick={this.goToRegister}>注册</span>
                    </div>
                </Form>
            </div>
        )
    }
}

@inject('userStore') @observer @Form.create()
class RegisterView extends Component{
    state = {
        focusItem: -1
    }

    constructor(props){
        super(props)
        this.handleRegister = this.handleRegister.bind()
        this.updateState = this.updateState.bind()
        this.gobackLogin = this.gobackLogin.bind()
    }

    updateState = (dict) => {
        if(!this) return 
        this.setState(dict)
    }

    handleRegister = (e) => {
        e.preventDefault()
        console.log('handleRegister')
        this.setState({
            focusItem: -1
        })
        const username = this.props.form.getFieldValue('registerUsername')
        const password = this.props.form.getFieldValue('registerPassword')
        const confirmPassword = this.props.form.getFieldValue('confirmPassword')
        if(password === confirmPassword){
            this.props.userStore.handleRegister({username, password})
                .then(() => {
                    // 注册成功 跳转登录
                    console.log('注册成功')
                    this.gobackLogin()
                })
                .catch(error => {
                    // 处理登录失败情况
                    this.props.form.setFields({
                        registerUsername: {
                            value: username,
                            errors: [new Error(error)]
                        }
                    })
                })
        }
    }

    gobackLogin = () => {
        this.props.switchShowBox('login')
        setTimeout(() => this.props.form.resetFields(), 500)
    }

    render = () => {
        const {getFieldDecorator, getFieldError, getFieldValue} = this.props.form
        const {focusItem} = this.state
        const Item = Form.Item

        return(
            <div className={this.props.classname} >
                <h3 className="title">注册</h3>
                <Form onSubmit={(e) => this.handleRegister(e)} >
                    <Item help={getFieldError('registerUsername')} >
                        {getFieldDecorator("registerUsername", {
                            validateFirst: true,
                            rules:[
                                {required: true, message: "用户名不能为空"},
                                {pattern: '^[^ ]+$', message: '不能输入空格'},
                            ]
                        })(
                            <Input
                                onFocus={() => this.updateState({focusItem: 0})}
                                onBlur={() => this.updateState({focusItem: -1})}
                                maxLength={16}
                                placeholder='用户名'
                                addonBefore={<span className='iconfont icon-User' style={focusItem === 0 ? styles.focus : {}}/>}
                            />
                        )}
                    </Item>
                    <Item help={getFieldError('registerPassword')} >
                        {getFieldDecorator('registerPassword', {
                            validateFirst: true,
                            rules: [
                                {required: true, message: '密码不能为空'},
                                {pattern: '^[^ ]+$', message: '密码不能有空格'}
                            ]
                            })(
                            <Input
                                onFocus={() => this.setState({focusItem: 1})}
                                onBlur={() => this.setState({focusItem: -1})}
                                type='password'
                                maxLength={16}
                                placeholder='密码'
                                addonBefore={<span className='iconfont icon-suo1' style={focusItem === 1 ? styles.focus : {}}/>}/>
                        )}
                    </Item>
                    <Item help={getFieldError('confirmPassword')}>
                        {getFieldDecorator('confirmPassword', {
                        validateFirst: true,
                        rules: [
                            {required: true, message: '请确认密码'},
                            {
                            validator: (rule, value, callback) => {
                                if (value && value !== getFieldValue('registerPassword')) {
                                callback('两次输入不一致！')
                                }
                                callback()
                            }
                            },
                        ]
                        })(
                        <Input
                            onFocus={() => this.setState({focusItem: 2})}
                            onBlur={() => this.setState({focusItem: -1})}
                            type='password'
                            maxLength={16}
                            placeholder='确认密码'
                            addonBefore={<span className='iconfont icon-suo1' style={focusItem === 2 ? styles.focus : {}}/>}/>
                        )}
                    </Item>
                    <div className='bottom'>
                        <input className='loginBtn' type="submit" value='注册'/>
                        <span className='registerBtn' onClick={() => this.gobackLogin()}>返回登录</span>
                    </div>
                </Form>
            </div>
        )
    }

}

@withRouter @inject('appStore') @observer
class Login extends Component {
    state = {
        currentShow: 'login',
        url: '',
        loading: false,
    }

    constructor(props){
        super(props)
        this.initPage = this.initPage.bind()
        this.loadImageAsync = this.loadImageAsync.bind()
        this.switchBox = this.switchBox.bind()
        this.updateState = this.updateState.bind()
    }

    componentDidMount = () => {
        this.initPage()
    }

    updateState = (dict) => {
        this.setState(dict)
    }

    loadImageAsync = (url) => {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.onload = () => {
                resolve(url)
            }
            image.src = url
        })
    }

    initPage = () => {
        this.updateState({
            loading: true
        })
        this.loadImageAsync(url)
            .then(url => {
                setTimeout(() => {
                    this.updateState({
                        loading: false,
                        url
                    })
                }, 1000);
            })
    }

    switchBox = (box) => {
        this.updateState({
            currentShow: box
        })
    }

    render(){
        const { currentShow, loading } = this.state
        return (
            <div id="login-page">
                {
                    loading ? 
                    <div>
                        <h3 style={styles.loadingTitle} className='animated bounceInLeft'>载入中...</h3>
                        <Loading/>
                    </div> : 
                    <div>
                        <div id='backgroundBox' style={styles.backgroundBox}/>
                        <div className='container'>
                            <LoginView
                                classname={currentShow === 'login' ? 'box showBox' : 'box hiddenBox'}
                                switchShowBox={(box) => this.switchBox(box)}/>
                            <RegisterView
                                classname={currentShow === 'register' ? 'box showBox' : 'box hiddenBox'}
                                switchShowBox={(box) => this.switchBox(box)}/>
                        </div>
                    </div>
                }
            </div>
        )
    }
}


const styles = {
    backgroundBox: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url(https://raw.githubusercontent.com/zeppelinn/mac_desktop/master/EI_Capitan_night.jpg)',
      backgroundSize: '100% 100%',
      transition:'all .5s'
    },
    focus: {
      // transform: 'scale(0.7)',
      width: '20px',
      opacity: 1
    },
    loadingBox:{
      position:'fixed',
      top:'50%',
      left:'50%',
      transform:'translate(-50%,-50%)'
    },
    loadingTitle:{
      position:'fixed',
      top:'50%',
      left:'50%',
      marginLeft: -45,
      marginTop: -18,
      color:'#000',
      fontWeight:500,
      fontSize:24
    },
  }

export default Login