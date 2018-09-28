import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ITEM_ACTIONS } from '../../../redux/actions/itemActions';

// import styled from 'styled-components';
import { ItemSearchBarContainer } from '../../styledComponents';


const mapStateToProps = state => ({
  searching: state.itemSearch.searching,
  searchTerm: state.itemSearch.searchTerm,
  selectingItems: state.currentStore.selectingItems,
});

class ItemSearchBar extends Component {
  // handleChange = event => {
  //   this.props.onChange(event.target.value);
  // };

  startItemSearchMode = () => {
    this.props.dispatch({type: ITEM_ACTIONS.START_ITEM_SEARCH_MODE});
  };

  stopItemSearchMode = () => {
    this.props.dispatch({type: ITEM_ACTIONS.STOP_ITEM_SEARCH_MODE});
  };

  updateSearchTerm = event => {
    const newValue = event.target.value;
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
    this.props.dispatch({type: ITEM_ACTIONS.CLEAR_ITEM_SEARCH_TERM});
    this.stopItemSearchMode();
  };

  render() {
    return (
      <ItemSearchBarContainer>
        <input type="text" style={{height: '100%', flexGrow: 1}}
          value={this.props.searchTerm} 
          onChange={this.updateSearchTerm}
          placeholder="Find an item by name"
        />
        {this.props.searching ? <button onClick={this.handleCancelClick}>Cancel</button> : null}
      </ItemSearchBarContainer>
    );
  }
}

export default connect(mapStateToProps)(ItemSearchBar);