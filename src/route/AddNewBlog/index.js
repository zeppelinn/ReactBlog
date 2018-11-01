import React, { Component } from 'react'
import {Card, Spin, Button, Input, List, Switch, Avatar,BackTop,Anchor,Affix,Icon} from 'antd'
import { inject, observer } from 'mobx-react'

@inject('appStore') @observer
class AddNewBlog extends Component {

    constructor(props){
        super(props)
        this.uploadBlog = this.uploadBlog.bind()
    }

    uploadBlog = () => {
        this.props.appStore.uploadNewBlog({
            key: this.refs.BlogURL.textAreaRef.value,
            title: this.refs.BlogTitle.textAreaRef.value,
            content: this.refs.BlogContent.textAreaRef.value,
            author: this.refs.BlogAuthor.textAreaRef.value
        })
    }

    render() {
        return (
            <div>
                <Card bordered={false} title="添加URL" className='card-item' style={{paddingLeft:50, paddingRight:50}}>
                    <Input.TextArea ref='BlogURL' rows={1} ></Input.TextArea>
                </Card>
                <Card bordered={false} title="添加标题" className='card-item' style={{paddingLeft:50, paddingRight:50}}>
                    <Input.TextArea ref='BlogTitle' rows={1} ></Input.TextArea>
                </Card>
                <Card bordered={false} title="内容" className='card-item' style={{paddingLeft:50, paddingRight:50}}>
                    <Input.TextArea ref='BlogContent' rows={50} ></Input.TextArea>
                </Card>
                <Card bordered={false} title="作者" className='card-item' style={{paddingLeft:50, paddingRight:50}}>
                    <Input.TextArea ref='BlogAuthor' rows={1} ></Input.TextArea>
                </Card>
                <Button style={{marginTop:10, float:"right"}} type="primary" size={'default'} onClick={() => this.uploadBlog()}>发布文章</Button>
            </div>
        )
    }
}

export default AddNewBlog