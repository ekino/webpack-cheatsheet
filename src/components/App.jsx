/**
 * Created by Pebie on 22/09/15.
 */
import React, { Component } from 'react';
import { RouteHandler, Link } from 'react-router';

export default class App extends Component {

    render() {
        return (
            <div>
                <Link to='/doc'>Documentation</Link>
                <RouteHandler />
            </div>
        );
    }
}
