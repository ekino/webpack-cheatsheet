/**
* Created by Pebie on 22/09/15.
*/

import React, { Component, PropTypes } from 'react';
import {Button}                        from 'react-bootstrap';
import classNames                      from 'classnames';

export default class DocText extends Component {
  constructor(props) {
    super(props);
    this.state = {currentDoc:'Roll over the code !',toggleOn:false}
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      currentDoc: nextProps.currentDoc
    })
  }

  createMarkup(){
    return { __html: this.state.currentDoc };
  }

  toggle(){
    this.setState({
      toggleOn:!this.state.toggleOn
    });
    let { toggle } = this.props;
    toggle();
  }

  render() {
    let { toggleOn } = this.state;
    let toggleClass = classNames('fa pointer', {
      'fa-toggle-on': toggleOn === false,
      'fa-toggle-off':   toggleOn === true
    });
    return (

        <div>
          <div className="doc_helper-info">
            <h3 className="doc_helper-title">Documentation</h3>
            <hr/>
            {this.state.currentDoc}
            <hr/>
            <div className="doc_helper-toggle">
              <span className="doc_helper-toggle-text">Toggle Comments</span>
              <i className={toggleClass} onClick={this.toggle.bind(this)}></i>
            </div>
          </div>
        </div>

    );
  }
}
DocText.propTypes = {
  toggle: PropTypes.func.required
};
DocText.defaultProps = { };
