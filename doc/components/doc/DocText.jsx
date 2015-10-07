/**
* Created by Pebie on 22/09/15.
*/

import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';

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

    let { toggle } = this.props;

    return (
      <div>
        <div className="doc_helper-info">
          {this.state.currentDoc}
        </div>
        <Button bsStyle='primary' className='doc_helper-toggle-btn' onClick={toggle}> Toggle Comments </Button>
      </div>

    );
  }
}
DocText.propTypes = {
  toggle: PropTypes.func.required
};
DocText.defaultProps = { };
