/**
* Created by Pebie on 22/09/15.
*/
import '../../styles/components/footer.scss';

import React, { Component } from 'react';
import { Row, Grid, div } from 'react-bootstrap';

export default class Footer extends Component {

  render() {
    return (
      <div className="footer">
        <div className="footer-col" xs={12} md={2} >
          <div className="footer-col-content">
            Job
          </div>
        </div>
        <div className="footer-col" xs={12} md={2} >
          <div className="footer-col-content">
            Job
          </div>
        </div>
        <div className="footer-col" xs={12} md={2} >
          <div className="footer-col-content">
            Job
          </div>
        </div>
        <div className="footer-col" xs={12} md={2} >
          <div className="footer-col-content">
            Job
          </div>
        </div>
        <div className="footer-col footer-col--round" xs={12} md={2} />
      </div>
    );
  }
}
