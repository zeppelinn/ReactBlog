import React, { Component } from 'react'
import CustomMenu from '../CustomMenu/CustomMenu'

class SideNav extends Component {
    render() {
        return (
            <div style={{height: '100vh',overflowY:'scroll'}}>
                <div style={styles.logo} ></div>
                <CustomMenu collapsed={this.props.collapsed} />
            </div>
        )
    }
}

const styles = {
    logo: {
      height: '32px',
      background: 'rgba(255, 255, 255, .2)',
      margin: '16px'
    }
}

export default SideNav