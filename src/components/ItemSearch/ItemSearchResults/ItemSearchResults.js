import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItemOrUpdateQuantity } from '../../../redux/actions/currentStoreActions';
import { ITEM_ACTIONS } from '../../../redux/actions/itemActions';

import ItemTile from '../../ItemTile/ItemTile';

const mapStateToProps = state => ({
  items: state.items,
  currentStore: state.currentStore.store,
  currentList: state.currentStore.list,
  searchTerm: state.itemSearch.searchTerm,
});

class ItemSearchResults extends Component {

  addItemToCurrentList = item => () => {
    console.log('add item:', item);
    this.props.dispatch(addItemOrUpdateQuantity(this.props.currentStore.id, this.props.currentList, item));
    this.props.dispatch({
      type: ITEM_ACTIONS.STOP_ITEM_SEARCH_MODE
    });
    this.props.dispatch({
      type: ITEM_ACTIONS.CLEAR_ITEM_SEARCH_TERM
    });
  };

  render() {
    return (
      <div>
        {this.props.items
          .sort((item1, item2) => item1.name > item2.name)
          .filter(item => item.name.toLowerCase().includes(this.props.searchTerm))
          .map(item => (
            <ItemTile key={item.id}
              item={item}
              onClick={this.addItemToCurrentList(item)}
            />
          ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ItemSearchResults);