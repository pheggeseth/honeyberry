import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

class StoreSettingsPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    const {user, history} = this.props;
    if (!user.isLoading && user.userName === null) {
      history.push('home');
    }
  }

  render() {
    console.log(this.props.match.params.id);
    return (
      <div>
        <Nav />
        store edit page
      </div>
    );
  }
}

export default connect()(StoreSettingsPage);