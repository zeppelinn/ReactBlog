import React from 'react'
import {Card, Button, Input, List, BackTop, Alert} from 'antd'
import { withRouter } from 'react-router-dom'
import './style.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import hljs from 'highlight.js/lib/highlight';
import java from 'highlight.js/lib/languages/java';
import 'highlight.js/styles/solarized-dark.css'
import { inject, observer } from 'mobx-react'
import browserCookies from 'browser-cookies'

//导入highlight.js代码高亮样式
hljs.registerLanguage('java', java);
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

@withRouter @inject('appStore') @observer
class Blog extends React.Component{

    state = {
        commentsShow:[false, false, false, false, false],
        currentCommentId:"",
        currentCommentPublisher:"",
        commentContent:"",
        replyContent:"",
        commentWarningInfo:"",
        commentWarning:false,
        replyWarningInfo:"",
        replyWarning:false
    }

    constructor(props){
        super(props)
        this.requestBlog = this.requestBlog.bind()
        this.createMarkup = this.createMarkup.bind()
        this.updateCommentState = this.updateCommentState.bind()
        this.uploadComment = this.uploadComment.bind()
        this.uploadReply = this.uploadReply.bind()
    }

    // 页面完成加载时请求数据
    componentDidMount() {
        const key = this.props.location.pathname
        this.requestBlog({key})
    }

    // 请求当前页面内容
    requestBlog = ({key}) => {
        this.props.appStore.showBlog({key})
    }

    // 将文章中的markdown转化成对应的html字段
    createMarkup = () => {
        return {__html: md.render(this.props.appStore.blogContent)};
    }

    // 改变第1到5条评论的收起状态
    updateCommentState = (index) => {
        let itemIndex = index % 5
        let tempArr = this.state.commentsShow.slice(0)
        for (let i = 0; i < tempArr.length; i++) {
            if(i === itemIndex){
                tempArr[i] = !tempArr[itemIndex]
            }else{
                tempArr[i] = false
            }
        }
        this.setState({
            commentsShow:tempArr
        })
        const commentArr = this.props.appStore.blogComments.slice()
        if(!this.state.commentsShow[itemIndex]){
            this.setState({
                currentCommentId: commentArr[index]._id,
                currentCommentPublisher: commentArr[index].from
            })
        }
    }

    // 发送博客评论
    uploadComment = () => {
        this.setState({
            commentContent:""
        })
        const mCookie = browserCookies.get('cortezx_blog_userid')
        if(mCookie && mCookie !== ""){
            const content = this.state.commentContent
            if(!content || content === ''){
                this.setState({
                    commentWarning:true,
                    commentWarningInfo:"评论内容不能为空"
                })
                return 
            }
            this.setState({
                commentWarning:false,
                commentWarningInfo:""
            })
            const from = mCookie.split(' ')[1]
            this.props.appStore.uploadComment({from, content})
        }else{
            this.setState({
                commentWarning:true,
                commentWarningInfo:"请先登录"
            })
        }
    }

    // 发送回复
    uploadReply = () => {
        this.setState({
            replyContent:''
        })
        const mCookie = browserCookies.get('cortezx_blog_userid')
        if(mCookie && mCookie !== ""){
            const content = this.state.replyContent
            if(!content || content === ''){
                this.setState({
                    replyWarning:true,
                    replyWarningInfo:"回复内容不能为空"
                })
                return 
            }
            this.setState({
                replyWarning:false,
                replyWarningInfo:""
            })
            const from = mCookie.split(' ')[1]
            const to = this.state.currentCommentPublisher
            const commentId = this.state.currentCommentId
            this.props.appStore.uploadReply({from, content, to, commentId})
        }else{
            this.setState({
                replyWarning:true,
                replyWarningInfo:"请先登录"
            })
        }
    }

    render(){
        const MyComponent = () => {
            return <div dangerouslySetInnerHTML={this.createMarkup()}></div>
        }

        const comments = this.props.appStore.blogComments.slice()
        const replyView = (replies, index) => {
            console.log('replyView---->', replies)
            return (
            this.state.commentsShow[index] ?
            <div style={{backgroundColor:"#fafafa", marginLeft:10, marginRight:10}}>
                {
                    replies && replies.length > 0 ? 
                    <List
                        size="small"
                        dataSource={replies}
                        style={styles.listStyle}
                        split={true}
                        renderItem={reply => (
                            <div style={{marginLeft:10, marginTop:3, marginBottom:3}}>
                                <span>{reply.content}</span>
                                <span style={{fontSize:10, marginLeft:100, color:"grey"}}> - {reply.from}</span>
                            </div>
                        )}
                    /> : 
                    null
                }
                {this.state.replyWarning ? 
                    <Alert style={{marginLeft:10, marginTop:3, marginBottom:3, width:"90%"}} message={this.state.replyWarningInfo} type="info" showIcon /> : 
                    null
                }
                <Input.TextArea value={this.state.replyContent} style={{width:"90%", marginLeft:10}} rows={1} placeholder={'和谐社会，文明发言'} onChange={(e) => this.setState({replyContent:e.target.value,replyWarning:false})} ></Input.TextArea>
                <Button style={{float:"right", right:"2%", marginTop:4}} type="primary" size={'small'}  onClick={() => this.uploadReply()} >回复</Button>
            </div> :
            null)
        }

        const date = new Date(this.props.appStore.blogCreateTime)
        const createTime = date.getUTCFullYear() + "-" + date.getMonth() + "-" + date.getDate()
        const title = (
            <div>
                <p style={{fontSize:20}}>
                {this.props.appStore.blogTitle}
                </p>
                <p style={{fontSize:12, color:"#bbbbbb"}} >{this.props.appStore.blogAuthor} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {createTime}</p>
            </div>
        )
        return (
            <div>
                <Card bordered={false} title={title} style={{marginBottom: 10}} id='basicUsage'>
                    <MyComponent></MyComponent>
                </Card>
                <Card bordered={false} title='评论' style={{marginBottom: 10}} id='remoteLoading'>
                    {
                        comments.length === 0 ? 
                        null : 
                        <List loading={this.props.appStore.loading}
                            dataSource={comments}
                            style={styles.listStyle}
                            split={false}
                            pagination={
                                {
                                    pageSize: 5,
                                    onChange: (page) => {
                                        this.setState({
                                            currentCommentPage: page
                                        })
                                    }
                                }
                            }
                            renderItem={item => {
                                let index = comments.indexOf(item)
                                return <div>
                                    <List.Item actions={[<a onClick={() => this.updateCommentState(index)}>{this.state.commentsShow[index]?"收起":"回复"}</a>]}>
                                        <List.Item.Meta
                                        title={item.content}
                                        description={item.from}
                                        />
                                    </List.Item>
                                    {replyView(comments[index].replies.slice(), index)}
                                </div>
                            }}
                        />
                    }
                </Card>
                <Card bordered={false} title="留言" className='card-item' style={{paddingLeft:50, paddingRight:50}}>
                    <Input.TextArea value={this.state.commentContent} rows={6} onChange={(e) => this.setState({commentContent:e.target.value, commentWarning:false})} ></Input.TextArea>
                    {this.state.commentWarning ? 
                        <Alert style={{marginTop:10}} message={this.state.commentWarningInfo} type="info" showIcon /> : 
                        null
                    }
                    <Button style={{marginTop:10, float:"right"}} type="primary" size={'default'} onClick={() => this.uploadComment()}>发布评论</Button>
                </Card>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

const styles = {
    haveBorder: {
      minHeight: 270,
      width:'80%',
      boxSizing: 'border-box'
    },
    noBorder: {
      minHeight: 270,
      width:'80%',
      padding: '0 24px',
      boxSizing: 'border-box',
      border: '1px solid #fff'
    },
    loadMore: {
      height: 32,
      marginTop: 16,
      lineHeight: '32px',
      textAlign: 'center',
    },
    listStyle:{
      width:'80%'
    },
    affixBox:{
      position: 'absolute',
      top: 100,
      right: 50,
      with: 170
    }
  }

export default Blog