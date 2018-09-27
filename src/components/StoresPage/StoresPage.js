import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { STORE_ACTIONS } from '../../redux/actions/storeActions';

import Store from './Store/Store';

const mapStateToProps = state => ({
  user: state.user,
  stores: state.userStores,
  currentStore: state.currentStore.store,
});

class StoresPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newStoreName: ''
    };
  }

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: STORE_ACTIONS.FETCH_USER_STORES});
  }

  componentDidUpdate() {
    const {user, history} = this.props;
    if (!user.isLoading && user.userName === null) {
      history.push('home');
    }
  }

  handleNewStoreNameChange = event => {
    this.setState({
      newStoreName: event.target.value
    });
  };

  addNewStore = () => {
    const {stores, dispatch} = this.props;
    if (stores.find(store => store.name === this.state.newStoreName)) {
      alert("A store with that name already exists. Please choose a different name.");
      return;
    } else {
      dispatch({
        type: STORE_ACTIONS.ADD_NEW_STORE,
        payload: this.state.newStoreName
      });
      this.setState({
        newStoreName: ''
      });
    }
  };

  render() {
    const {user, stores} = this.props;
    let content = null;

    if (user.userName) {
      content = (
        <div>
          <div>
            <input type="text" 
              placeholder="Add a new store."
              value={this.state.newStoreName}
              onChange={this.handleNewStoreNameChange}
            />
            <button onClick={this.addNewStore}>Add</button>
          </div>
          <div>
            {stores.map(store => (
              <Store key={store.id} storeObj={store} history={this.props.history}/>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* <Nav /> */}
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StoresPage);
