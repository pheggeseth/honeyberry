import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ITEM_ACTIONS } from '../../redux/actions/itemActions';

import ItemSearchBar from './ItemSearchBar/ItemSearchBar';
import ItemSearchResults from './ItemSearchResults/ItemSearchResults';

const mapStateToProps = state => ({
  searching: state.itemSearch.searching,
  searchTerm: state.itemSearch.searchTerm,
  selectingItems: state.currentStore.selectingItems,
});

class ItemSearch extends Component {
  startItemSearchMode = () => {
    this.props.dispatch({
      type: ITEM_ACTIONS.START_ITEM_SEARCH_MODE
    });
  }

  stopItemSearchMode = () => {
    this.props.dispatch({
      type: ITEM_ACTIONS.STOP_ITEM_SEARCH_MODE
    });
  };

  updateSearchTerm = newValue => {
    const {selectingItems, searchTerm, dispatch} = this.props;
    if (!selectingItems) {
      if (!searchTerm && newValue) {
        this.startItemSearchMode();
      } else if (searchTerm && !newValue) {
        this.stopItemSearchMode();
      }
  
      dispatch({
        type: ITEM_ACTIONS.SET_ITEM_SEARCH_TERM,
        payload: newValue,
      });
    }
  };

  handleCancelClick = () => {
    this.stopItemSearchMode();
    this.props.dispatch({
      type: ITEM_ACTIONS.CLEAR_ITEM_SEARCH_TERM
    });
    this.props.dispatch({
      type: ITEM_ACTIONS.STOP_ITEM_SEARCH_MODE
    });
  }

  render() {
    return (
      <div>
        <ItemSearchBar value={this.props.searchTerm} 
          onChange={this.updateSearchTerm}
        />
        {this.props.searching ? <button onClick={this.handleCancelClick}>Cancel</button> : null}
        {this.props.searching
        ? <ItemSearchResults />
        : null}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ItemSearch);