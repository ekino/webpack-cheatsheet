/**
 * Created by Pebie on 22/09/15.
 */
import React from 'react';
import { Route } from 'react-router';
import App from 'components/App.jsx';
import Doc from 'components/doc/Doc.jsx';


export default (
    <Route handler={ App }>
        <Route path='/doc' handler={ Doc }/>
    </Route>
);
