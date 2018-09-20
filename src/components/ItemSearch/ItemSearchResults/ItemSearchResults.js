import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';

const mapStateToProps = state => ({
  items: state.items,
});

class ItemSearchResults extends Component {
  render() {
    return (
      'search results'
    );
  }
}

export default connect(mapStateToProps)(ItemSearchResults);