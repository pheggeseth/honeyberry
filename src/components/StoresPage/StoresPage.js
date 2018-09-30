import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { STORE_ACTIONS } from '../../redux/actions/storeActions';

import { StoresListContainer, Button } from '../styledComponents';


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
          <div style={{display: 'flex', alignItems: 'center', height: '30px', marginBottom: '10px'}}>
            <input type="text" placeholder="Add new store"
              // style={{height: '100%'}}
              value={this.state.newStoreName}
              onChange={this.handleNewStoreNameChange} 
            /> 
            <Button className="red"
              style={{height: '100%', minWidth: '30px'}}
              onClick={this.addNewStore}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>



          {/* <div>
            <input type="text" 
              placeholder="Add a new store."
              value={this.state.newStoreName}
              onChange={this.handleNewStoreNameChange}
            />
            <button onClick={this.addNewStore}>Add</button>
          </div> */}
          <StoresListContainer id="StoresListContainer">
            {stores.sort(byNameAlphabetically).map(store => (
              <Store key={store.id} storeObj={store} history={this.props.history}/>
            ))}
          </StoresListContainer>
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

const byNameAlphabetically = (object1, object2) => {
  let name1 = object1.name.toUpperCase();
  let name2 = object2.name.toUpperCase();
  if (name1 < name2) return -1;
  if (name1 > name2) return 1;
  
  return 0;
};

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StoresPage);
