import React from "react";
import  ReactDOM  from "react-dom"
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from "react-redux";

import App from './components/App'
import Store from "./features/Store"

ReactDOM.render(
    <Router>
    <Provider store= {Store}>
       <App/>
    </Provider>
    </Router>
    ,document.getElementById('root')
)