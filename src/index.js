import React from 'react'
import ReactDom from 'react-dom'
import { Provider} from 'mobx-react'
import store from './store'
import { LocaleProvider } from 'antd'
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import "./App.css"
import "./index.css"
import "./assets/font/iconfont.css"
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'antd/dist/antd.css'

import Index from './route/Index'

ReactDom.render(
    <LocaleProvider locale={zh_CN}> 
        <Provider {...store} >
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Index}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    </LocaleProvider>, document.getElementById('root')
)