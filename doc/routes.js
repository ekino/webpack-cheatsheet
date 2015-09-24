/**
 * Created by Pebie on 22/09/15.
 */
import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import App from 'components/App.jsx';


export default (
    <Route handler={ App }>
        <DefaultRoute />
    </Route>
);
