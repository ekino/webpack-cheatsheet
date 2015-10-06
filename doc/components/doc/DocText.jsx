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
      <div className="doc-text">
        <pre>{ this.state.currentDoc }</pre>
      </div>
    );
  }
}
DocText.propTypes = {

};
DocText.defaultProps = { };
