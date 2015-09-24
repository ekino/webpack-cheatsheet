/**
 * Created by Pebie on 22/09/15.
 */
import React, { Component } from 'react';
import { RouteHandler, Link } from 'react-router';
import Doc from 'components/doc/Doc.jsx';


export default class App extends Component {

    render() {
        return (
            <div>
                <Doc />
                <RouteHandler />
            </div>
        );
    }
}
