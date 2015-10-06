/**
* Created by Pebie on 22/09/15.
*/

import React, { Component, PropTypes } from 'react';

export default class DocText extends Component {
    constructor(props) {
        super(props);
        this.state = {currentDoc:''}
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            currentDoc: nextProps.currentDoc
        })
    }

    render() {

        return (
            <pre className="editor">
                { this.state.currentDoc }
            </pre>
        );
    }
}
DocText.propTypes = {

};
DocText.defaultProps = { };
