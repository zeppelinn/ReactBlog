import React from 'react'
import {Carousel} from 'antd'
import './style.css'

const imgs = [
  'https://github.com/zeppelinn/mac_desktop/blob/master/EI_Capitan_1.jpg?raw=true',
  'https://github.com/zeppelinn/mac_desktop/blob/master/Death_Valley.jpg?raw=true',
  'https://github.com/zeppelinn/mac_desktop/blob/master/Sierra.jpg?raw=true',
  'https://github.com/zeppelinn/mac_desktop/blob/master/Yosemite_1.jpg?raw=true',
  'https://github.com/zeppelinn/mac_desktop/blob/master/Yosemite_2.jpg?raw=true',
  'https://github.com/zeppelinn/mac_desktop/blob/master/Yosemite_3.jpg?raw=true',
]

class Home extends React.Component {
  render() {
    return (
      <div style={styles.bg} className='home'>
        <Carousel arrows effect='fade' className='size'>
          {imgs.map(item=><div key={item}><div className='size' style={{backgroundImage:`url(${item})`}}/></div>)}
        </Carousel>
      </div>
    )
  }
}

const styles = {
  bg:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'calc(100vh - 64px)'
  }
}

export default Home