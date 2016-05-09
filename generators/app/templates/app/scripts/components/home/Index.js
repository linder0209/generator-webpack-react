import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class Home extends Component {

  previewExample(event) {
    event.preventDefault();
    event.stopPropagation();
    this.context.router.push('/example');
  }

  render() {
    return (
      <div className="perfect">
        <ol className="perfect-list">
          <li>
            <a className="link" onTouchTap={(event) => this.previewExample(event)}>查看例子</a>
          </li>
          <li>
            <Link className="link" to="/about">关于</Link>
          </li>
        </ol>
      </div>
    );
  }
}

Home.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Home;
