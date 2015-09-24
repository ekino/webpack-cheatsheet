/**
 * Created by Pebie on 22/09/15.
 */
import React from 'react';
import Router from 'react-router';
import routes from './routes';


Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler />, document.getElementById('doc'));
});
