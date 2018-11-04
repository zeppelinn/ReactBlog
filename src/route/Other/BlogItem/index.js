import React from 'react'
import {Card, Spin, Button, Input, List, Switch, Avatar,BackTop,Anchor,Affix,Icon} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import './style.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import hljs from 'highlight.js/lib/highlight';
import java from 'highlight.js/lib/languages/java';
import 'highlight.js/styles/solarized-dark.css'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import BrowserCookies from 'browser-cookies'

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

const data3 = []
for(let i=0;i<23;i++){
    data3.push({
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    })
}

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
class BlogItem extends React.Component {
    state = {
        size: 'default',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,
        editorState: EditorState.createEmpty(),
        contentState:content,
        commentsShow:[false, false, false, false, false],
        blogContent:'',
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    getBlogContent = (contentState) => {
        let content = ''
        for (let i = 0; i < contentState.blocks.length; i++) {
            content += contentState.blocks[i].text + '\n'
        }
        return content
    }

    onContentStateChange =  (contentState) => {
        console.log('onContentStateChange--->', this.getBlogContent(contentState))
        // this.setState({
        //     blogContent: this.getBlogContent(contentState),
        // });
    };

    onBlogContentChange = (content) => {
        console.log('onBlogContentChange---->', typeof(content));
        this.setState({
            blogContent: content,
        });
    }

    uploadImageCallBack = ()=>{

    }

    componentDidMount() {
        
        console.log('props----->', BrowserCookies.get("cortezx_blog_userid"))
        this.props.appStore.showBlog({key:"/home/addNewBlog"})
        this.setState({
            loading: true,
        })
        this.getData2();
        this.setState({
            loading: false
        })
    }

    getData2 = () => {
        this.setState({
        loadingMore: true
        })
            axios.get('https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo').then(res => {
                this.setState({
                    data2: this.state.data2.concat(res.data.results),
                    loadingMore: false
                })
        })
    }

    updateCommentState = (index) => {
        let tempArr = this.state.commentsShow.slice(0)
        for (let i = 0; i < tempArr.length; i++) {
            if(i === index){
                tempArr[i] = !tempArr[index]
            }else{
                tempArr[i] = false
            }
        }
        this.setState({
            commentsShow:tempArr
        })
    }

    createMarkup = ()=>  {
        console.log('this.props.appStore.blogContent--->', this.props.appStore.blogContent)
        return {__html: md.render(this.props.appStore.blogContent)};
    }
    parseBlogContent = () => {
        this.onBlogContentChange(this.refs.BlogContent.textAreaRef.value)
    }

    render() {
        const {loading, data2} = this.state
        const { editorState } = this.state;
        const comments = [
            {
                name:"visitor 1",
                comment:'react is shit',
            },
            {
                name:"visitor 2",
                comment:'Android is shit'
            }
        ]
        const commentView = (index) => {
                console.log('commentView---->', this.state.commentsShow[index])
                return this.state.commentsShow[index] ?
                <div style={{backgroundColor:"#fafafa", marginLeft:10, marginRight:10}}>
                    {comments.length === 0 ? null: <List
                        size="small"
                        dataSource={comments}
                        style={styles.listStyle}
                        renderItem={commentItem => (
                            <div style={{marginLeft:10}}>
                                <p>{commentItem.comment}</p>
                                <p style={{fontSize:10, marginLeft:100}}> - {commentItem.name}</p>
                            </div>
                        )}
                        />}
                    <Input style={{width:"90%", marginLeft:10}} placeholder={'和谐社会，文明发言'} ></Input>
                    <Button style={{float:"right", right:"2%", marginTop:4}} type="primary" size={'small'}>回复</Button>
                </div> : null
        }
        const MyComponent = () => {
            console.log('createMarkup---->', this.createMarkup())
            return <div dangerouslySetInnerHTML={this.createMarkup()}></div>
        }

        const date = new Date()
        const createTime = date.getUTCFullYear() + "-" + date.getMonth() + "-" + date.getDate()
        const title = (
            <div>
                <p style={{fontSize:20}}>
                基本用法
                </p>
                <p style={{fontSize:12, color:"#bbbbbb"}} >lijun &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {createTime}</p>
            </div>
        )
        return (
            <div>
                <CustomBreadcrumb arr={['显示', '列表']}/>
                <Card bordered={false} title={title} style={{marginBottom: 10}} id='basicUsage'>
                    <MyComponent></MyComponent>
                </Card>
                <Card bordered={false} title='评论' style={{marginBottom: 10}} id='remoteLoading'>
                <List loading={loading}
                        dataSource={data2}
                        style={styles.listStyle}
                        split={false}
                        pagination={
                            {
                                pageSize: 2,
                                onChange: (page) => {

                                }
                            }
                        }
                        renderItem={item => {
                            let index = data2.indexOf(item) % 5
                            return <div>
                                <List.Item actions={[<a onClick={() => this.updateCommentState(index)}>{this.state.commentsShow[index]?"收起":"回复"}</a>]}>
                                    <List.Item.Meta
                                    avatar={<Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                    title={<a>{item.name.last}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                                {commentView(index)}
                            </div>
                        }}
                />
                </Card>
                <Card bordered={false} title="留言" className='card-item' style={{paddingLeft:50, paddingRight:50}}>
                    {/* <Editor
                        editorState={editorState}
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onContentStateChange}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        localization={{ locale: 'zh'}}
                        toolbar={{
                            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true }},
                        }}
                    /> */}
                    <Input.TextArea ref='BlogContent' rows={6} ></Input.TextArea>
                    <Button style={{marginTop:10, float:"right"}} type="primary" size={'default'} onClick={() => this.parseBlogContent()}>发布评论</Button>
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

export default BlogItem