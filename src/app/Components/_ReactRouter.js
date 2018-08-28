import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';

import Grid from "./Grid";


export default () => (
    <HashRouter>
        <Switch>
            <Route exact path="/main" render={ (props) => <p>Landing</p> } /> 
            <Route path="/select" component={Grid} />
            <Route path="/reports" render={  (props) => <p>Select Items</p> } /> 
        </Switch>     
    </HashRouter>
)