/**
* Created by Pebie on 22/09/15.
*/

import React, { Component, PropTypes } from 'react';


export default class DocText extends Component {
  constructor(props) {
    super(props);
    this.state = {currentDoc:''}
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      currentDoc: nextProps.currentDoc
    })
  }

  createMarkup(){
    return { __html: this.state.currentDoc };
  }

  render() {

    return (

      <div id="doc-text" className="doc-text">
        {this.state.currentDoc}
      </div>

    );
  }
}
DocText.propTypes = {

};
DocText.defaultProps = { };
