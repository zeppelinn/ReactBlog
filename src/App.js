import React, { Component } from 'react';
import './App.css';
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import MarkdownIt from 'markdown-it';
import 'simplemde/dist/simplemde.min.css'


class App extends Component {

constructor(props){
  super(props);
  this.editorId = 123;
  this.md = new MarkdownIt();
  this.result = this.md.render(`# hello`);
}

  componentDidMount() {
    // this.smde = new SimpleMDE({
    //     element: document.getElementById(this.editorId).childElementCount,
    //     autofocus: true,
    //     autosave: true,
    //     previewRender: function (plainText) {
    //         return marked(plainText, {
    //             renderer: new marked.Renderer(),
    //             gfm: true,
    //             pedantic: false,
    //             sanitize: false,
    //             tables: true,
    //             breaks: true,
    //             smartLists: true,
    //             smartypants: true,
    //             highlight: function (code) {
    //                 return highlight.highlightAuto(code).value;
    //             },
    //         });
    //     },
    // })
    
}

createMarkup = ()=>  {
  return {__html: this.result};
}

render() {
  const MyComponent = () => (
    <div dangerouslySetInnerHTML={this.createMarkup()}></div>
  )
    return (
      <div style={{marginLeft:50, marginRight: 50, marginTop: 50}} >
        <p>Hello</p>
        <MyComponent></MyComponent>
      </div>
    );
  }
}

export default App;
