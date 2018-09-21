import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemTile from '../../ItemTile/ItemTile';

const mapStateToProps = state => ({
  items: state.items,
  currentStore: state.currentStore.store,
  currentList: state.currentStore.list,
  searchTerm: state.itemSearch.searchTerm,
});

class ItemSearchResults extends Component {
  render() {
    return (
      <div>
        {this.props.items
          .sort((item1, item2) => item1.name > item2.name)
          .filter(item => item.name.toLowerCase().includes(this.props.searchTerm))
          .map(item => (
            <ItemTile key={item.id}
              searchResult
              item={item}
            />
          ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ItemSearchResults);