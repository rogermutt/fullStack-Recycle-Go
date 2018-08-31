import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';

import Test from "./Test";
import Registration from "./Registration";

export default () => (
    <HashRouter>
        <Switch>
            <Route exact path="/register" component={Registration} />
            <Route exact path="/main" render={  (props) => <p>Main</p> } /> 
            <Route path="/select" component={Test} />
            <Route path="/reports" render={  (props) => <p>Select Items</p> } /> 
        </Switch>     
    </HashRouter>
)