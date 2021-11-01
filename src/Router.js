import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Login from './screens/login';
import Dashboard from './screens/dashboard';
import CreateList from './screens/create-list';
import UpdateList from './screens/update-list';

import Home from './screens/home';

import RMPurchase from './screens/rm-purchase';
import RMCreateList from './screens/rm-create-list';

import PrivateRoute from './screens/PrivateRoute';
import RMUpdateList from './screens/rm-update-list';



function Router() {
    return (
        <BrowserRouter>
            <Switch>
                {/* LOGIN ROUTE */}
                <Route exact path="/" component={Login}></Route>

                {/* HOME SCREEN ROUTE */}
                <PrivateRoute path="/home"><Home/></PrivateRoute>

                {/* DASHBOARD SCREEN ROUTE */}
                <PrivateRoute path="/dashboard"><Dashboard/></PrivateRoute>
                <PrivateRoute path="/create-list"><CreateList/></PrivateRoute>
                <PrivateRoute path="/update/:id"><UpdateList/></PrivateRoute>
                
                {/* RM PURCHASE SCREEN ROUTE */}
                <PrivateRoute path="/rm-purchase-list"><RMPurchase/></PrivateRoute>
                <PrivateRoute path="/rm-create-list"><RMCreateList/></PrivateRoute>
                <PrivateRoute path="/rm/update/:id"><RMUpdateList/></PrivateRoute>

            </Switch>
        </BrowserRouter>
    )
}

export default Router
