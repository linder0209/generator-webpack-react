import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Film extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'all'
    }
    this.animations = ['example-opacity', 'example-fade-in', 'example-burst-in'];
  }

  componentWillMount() {
    this.switchTab('all');
  }

  switchTab(type, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const {
      filmActions
    } = this.props;

    //切换之前先清空
    filmActions.cleanFilmList(this.state.type);

    this.setState({
      activeTab: type
    });

    filmActions.getFilmList(type);
  }

  renderList() {
    const {
      allFilmList, popularityFilmList
    } = this.props;

    const {activeTab} = this.state;
    const film = activeTab === 'all' ? allFilmList : popularityFilmList;
    const list = film.list;
    return (
      <ul className="list-group">
        {
          list.map((item) => {
            const {id, name, link} = item;
            return (
              <li key={id} className="list-group-item">
                <a href={link} target="_blank">{name}</a>
              </li>
            );
          })
        }
      </ul>
    )
  }

  render() {
    const {activeTab} = this.state;

    const random = Math.ceil(Math.random() * 10);
    let index = 0;
    if (random > 4 && random < 8) {
      index = 1;
    } else if (random >= 8) {
      index = 2;
    }
    const transitionName = this.animations[index];

    return (
      <div className="container">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className={classnames({'nav-link': true, active: activeTab === 'all'})}
               onTouchTap={(event) => this.switchTab('all', event)}>全部</a>
          </li>
          <li className="nav-item">
            <a className={classnames({'nav-link': true, active: activeTab === 'popularity'})}
               onTouchTap={(event) => this.switchTab('popularity', event)}>人气</a>
          </li>
        </ul>
        <ReactCSSTransitionGroup
          component="div"
          transitionName={transitionName}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={200}>
          <div className="tab-content m-t-1" key={activeTab}>
            {this.renderList()}
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Film.propTypes = {
  filmActions: PropTypes.object,
  allFilmList: PropTypes.object,
  popularityFilmList: PropTypes.object
};

export default Film;
