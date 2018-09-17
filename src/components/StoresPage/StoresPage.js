import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { STORE_ACTIONS } from '../../redux/actions/storeActions';

import Store from './Store/Store';

const mapStateToProps = state => ({
  user: state.user,
  stores: state.stores.userStores,
  currentStore: state.stores.currentStore,
});

class StoresPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: STORE_ACTIONS.FETCH_USER_STORES});
  }

  componentDidUpdate(prevProps) {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    const {user, stores} = this.props;
    let content = null;

    if (user.userName) {
      content = (
        <div>
          <p>
            Stores Page
          </p>
          {stores.map(store => (
            <Store key={store.id} storeObj={store} history={this.props.history}/>
          ))}
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
export default connect(mapStateToProps)(StoresPage);
