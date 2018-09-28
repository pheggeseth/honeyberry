import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../../redux/actions/currentStoreActions';
import { ITEM_SELECT_ACTIONS } from '../../../redux/actions/itemSelectActions';

import { List } from '../../styledComponents';
import ItemTile from '../../ItemTile/ItemTile';

const mapStateToProps = state => ({
  currentStore: state.currentStore.store,
  currentList: state.currentStore.list,
  editingEssentials: state.currentStore.editingEssentials,
  selectingItems: state.currentStore.selectingItems,
  selectedItems: state.itemSelect.selectedItems,
  editingList: state.currentStore.editingList,
  movingItems: state.currentStore.movingItems,
  deletingItems: state.currentStore.deletingItems,
});

class EssentialItems extends Component {
  startEssentialsListEditing = () => {
    const {dispatch, editingList, selectingItems, movingItems, deletingItems, items} = this.props;
    if (editingList) {
      dispatch({type: CURRENT_STORE_ACTIONS.STOP_LIST_EDITING_MODE});
      if (selectingItems) {
        dispatch({type: ITEM_SELECT_ACTIONS.CLEAR_SELECTED_ITEMS});
        dispatch({type: ITEM_SELECT_ACTIONS.STOP_ITEM_SELECTION_MODE});
      }
      if (movingItems) {
        dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_ITEM_MOVE_TARGET_STORE});
        dispatch({type: CURRENT_STORE_ACTIONS.STOP_ITEM_MOVE_MODE});
      } else if (deletingItems) {
        dispatch({type: CURRENT_STORE_ACTIONS.STOP_ITEM_DELETE_MODE});
      }
    }
    dispatch({type: CURRENT_STORE_ACTIONS.START_ESSENTIALS_EDITING_MODE});
    dispatch({type: ITEM_SELECT_ACTIONS.START_ITEM_SELECTION_MODE});
    dispatch({
      type: ITEM_SELECT_ACTIONS.SET_SELECTED_ITEMS,
      payload: items
    });
  };

  stopEssentialsListEditing = () => {
    this.props.dispatch({type: ITEM_SELECT_ACTIONS.CLEAR_SELECTED_ITEMS});
    this.props.dispatch({type: ITEM_SELECT_ACTIONS.STOP_ITEM_SELECTION_MODE});
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.STOP_ESSENTIALS_EDITING_MODE});
  };

  updateEssentialsList = () => {
    const {dispatch, currentStore, selectedItems} = this.props;
    dispatch({
      type: CURRENT_STORE_ACTIONS.UPDATE_ESSENTIALS_LIST,
      payload: {
        storeId: currentStore.id,
        list: selectedItems,
      }
    });
    this.stopEssentialsListEditing();
  };

  render() {
    const {items, editingEssentials} = this.props;
    return(
      <div>
        <div style={{color: 'white', fontWeight: 'bold'}}>ESSENTIAL ITEMS</div>
        {editingEssentials
        ? (<span>
            <button onClick={this.stopEssentialsListEditing}>Undo</button>
            <button onClick={this.updateEssentialsList}>Save</button>
          </span>)
        : <button onClick={this.startEssentialsListEditing}>Edit</button>
        }
        <List>
          {items.map(item => (
            <ItemTile key={item.id} 
              essentialItem
              item={item} 
            />
          ))}
        </List>
      </div>
    );
  }
}

export default connect(mapStateToProps)(EssentialItems);