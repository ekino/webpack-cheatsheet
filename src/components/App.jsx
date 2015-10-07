/**
 * Created by Pebie on 22/09/15.
 */
import React, { Component } from 'react';
import { RouteHandler, Link } from 'react-router';

export default class App extends Component {

    render() {
        return (
            <div>
                You work in the 'src' folder
                <RouteHandler />
            </div>
        );
    }
}
