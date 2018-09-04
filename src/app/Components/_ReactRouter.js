import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';

import Test from "./Test";
import Registration from "./Registration";
import Grid from "./Grid";

export default () => (
    <HashRouter>
        <Switch>
            <Route exact path="/register" component={Registration} />
            <Route exact path="/main" component={Grid} />
            <Route path="/select" component={Test} />
            <Route path="/reports" render={  (props) => <p>Select Items</p> } /> 
        </Switch>     
    </HashRouter>
)