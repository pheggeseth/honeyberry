import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS, addItemOrUpdateQuantity } from '../../../redux/actions/currentStoreActions';
import ItemTile from '../../ItemTile/ItemTile';

const mapStateToProps = state => ({
  currentStore: state.currentStore.store,
  currentList: state.currentStore.list,
  editingEssentials: state.currentStore.editingEssentials,
  selectedItems: state.currentStore.selectedItems,
});

class EssentialItems extends Component {
  // addEssentialItemToCurrentItems = newItem => {
  //   const storeId = this.props.currentStore.id;
  //   const list = this.props.currentList;
  //   this.props.dispatch(addItemOrUpdateQuantity(storeId, list, newItem));
  // };

  editEssentialsList = () => {
    const {editingEssentials, selectedItems, dispatch} = this.props;
    if (editingEssentials) {
      dispatch({
        type: CURRENT_STORE_ACTIONS.UPDATE_ESSENTIALS_LIST,
        payload: selectedItems,
      });
      dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_SELECTED_ITEMS});
      dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ITEM_SELECTION_MODE});
      dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ESSENTIALS_EDITING_MODE});
    } else {
      dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ESSENTIALS_EDITING_MODE});
      dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ITEM_SELECTION_MODE});
      dispatch({
        type: CURRENT_STORE_ACTIONS.SET_SELECTED_ITEMS,
        payload: this.props.items
      });
    }
    
  };

  // handleClick = clickedItem => () => {
  //   if (this.props.editingEssentials) {
  //     // remove item from essentials list
  //     this.removeEssentialItem(clickedItem);
  //   } else {
  //     this.addEssentialItemToCurrentItems(clickedItem);
  //   }
  // };

  // removeEssentialItem = item => {
  //   this.props.dispatch({
  //     type: CURRENT_STORE_ACTIONS.REMOVE_ESSENTIAL_ITEM,
  //     payload: item
  //   });
  // };

  render() {
    const {items} = this.props;
    return(
      <div>
        <strong>essential items</strong>
        <button onClick={this.editEssentialsList}>
          {!this.props.editingEssentials
            ? 'Edit'
            : 'Done'
          }
        </button>
        <ul>
          {items.map(item => (
            <ItemTile key={item.id} 
              essentialItem
              item={item} 
              // onClick={this.handleClick(item)} 
            />
          ))}
        </ul>
        
      </div>
    );
  }
}

export default connect(mapStateToProps)(EssentialItems);