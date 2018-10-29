import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Grid from "./Grid";
import Report from "./Report";
import Landing from "./Landing";
import Calendar from "./Calendar";
import auth0Client from '../../Auth/auth';

const LogingPage = () => {
    auth0Client.signIn();
    return null;
}

export default () => (
        <Switch>
            <Route exact path="/authorize" component={LogingPage} />
            <Route exact path="/?/callback" component={Landing} />
            <Route exact path="/" component={Landing} />
            <Route path="/select" component={Grid} />
            <Route path="/reports" component={Report} />
            <Route path="/calendar" component={Calendar} />
        </Switch>     
)