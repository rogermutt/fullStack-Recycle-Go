import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';

import Registration from "./Registration";
import Grid from "./Grid";
import Report from "./Report";
import Landing from "./Landing";
import Calendar from "./Calendar";

export default () => (
    <HashRouter>
        <Switch>
            <Route exact path="/register" component={Registration} />
            <Route exact path="/landing" component={Landing} />
            <Route path="/select" component={Grid} />
            <Route path="/reports" component={Report} />
            <Route path="/calendar" component={Calendar} />
        </Switch>     
    </HashRouter>
)