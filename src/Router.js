import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Login from './screens/login';
import Dashboard from './screens/dashboard';
import PrivateRoute from './screens/PrivateRoute';



function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <PrivateRoute path="/dashboard"><Dashboard/></PrivateRoute>
            </Switch>
        </BrowserRouter>
    )
}

export default Router
