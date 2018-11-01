import React from 'react'
import {Card, Spin, Button, Input, List, Switch, Avatar,BackTop,Anchor,Affix,Icon} from 'antd'
import axios from 'axios'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { withRouter } from 'react-router-dom'
import './style.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import hljs from 'highlight.js/lib/highlight';
import java from 'highlight.js/lib/languages/java';
import 'highlight.js/styles/solarized-dark.css'
import { inject, observer } from 'mobx-react'

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

    // 页面完成加载时请求数据
    componentDidMount() {
        
    }

    render(){
        return (
            <div>

            </div>
        )
    }
}

export default Blog