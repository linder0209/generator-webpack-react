import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import reactLogo from '../../images/react-logo.svg';
import reduxLogo from '../../images/redux-logo.png';
import reactRouterLogo from '../../images/react-router-logo.png';

const width = 40;
const height = 40;

class About extends Component {

  render() {
    return (
      <div className="about">
        <h4>React Redux Router Webpack Gulp etc.</h4>
        <div className="perfect-icon"></div>
        <div className="about-img">
          <img src={reactLogo} alt="React" height={height}/>
          <img src={reduxLogo} alt="Redux" height={height}/>
          <img src={reactRouterLogo} alt="React Router" height={height}/>
        </div>
      </div>
    );
  }
}

export default connect()(About);
