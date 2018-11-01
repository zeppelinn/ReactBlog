import React from 'react'
import {Card, Spin, Button, Radio, List, Switch, Avatar,BackTop,Anchor,Affix,Icon} from 'antd'

const data3 = []
for(let i=0;i<23;i++){
  data3.push({
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  })
}
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Blog extends React.Component {
  state = {
    size: 'default',
    bordered: true,
    data2: [],
    loading: false,
    loadingMore: false,
  }

  componentDidMount() {
    this.setState({
      loading: true,
    })
    this.setState({
      loading: false
    })
  }

  render() {
    return (
      <div>
        <Card bordered={false} style={{marginBottom: 15}} id='verticalStyle'>
          <List dataSource={data3}
                itemLayout='vertical'
                pagination={{pageSize: 7}}
                style={styles.listStyle}
                renderItem={item=>{
                  return (
                    <List.Item
                      actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                      extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a>{item.title}</a>}
                        description={item.description}
                      />
                      {item.content}
                      </List.Item>
                  )
                }}
          />
        </Card>

        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
}

const styles = {
  listStyle:{
    width:'80%'
  },
}

export default Blog