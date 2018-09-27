import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { ITEM_ACTIONS } from '../../redux/actions/itemActions';

import ItemSearchBar from './ItemSearchBar/ItemSearchBar';
import ItemSearchResults from './ItemSearchResults/ItemSearchResults';

const mapStateToProps = state => ({
  searching: state.itemSearch.searching,
  searchTerm: state.itemSearch.searchTerm,
  selectingItems: state.currentStore.selectingItems,
});

class ItemSearch extends Component {
  

  

  

  render() {
    return (
      <div>
        <ItemSearchBar value={this.props.searchTerm} 
          onChange={this.updateSearchTerm}
        />
        
        {this.props.searching
        ? <ItemSearchResults />
        : null}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ItemSearch);