import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import CurrentItems from './CurrentItems/CurrentItems';
import CompletedItems from './CompletedItems/CompletedItems';
import EssentialItems from './EssentialItems/EssentialItems';

const mapStateToProps = state => ({
  user: state.user,
});

const list = [
  {
    id: 1,
    name: 'Apple',
    default_unit: 'each',
    category: 'Fruits',
    image_path: null,
    essential: false,
    completed: false,
  },
  {
    id: 2,
    name: 'Eggs',
    default_unit: 'dozen',
    category: 'Dairy',
    image_path: null,
    essential: true,
    completed: true,
  },
  {
    id: 3,
    name: 'Hamburger Buns',
    default_unit: 'each',
    category: 'Bread',
    image_path: null,
    essential: false,
    completed: false,
  },
];

class ListPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <CurrentItems items={list.filter(item => !item.completed)} />
          <CompletedItems items={list.filter(item => item.completed)} />
          <EssentialItems items={list.filter(item => item.essential)} />
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ListPage);
