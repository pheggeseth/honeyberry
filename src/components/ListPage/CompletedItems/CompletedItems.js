import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../../redux/actions/currentStoreActions';
import { ITEM_SELECT_ACTIONS } from '../../../redux/actions/itemSelectActions';
import ItemTile from '../../ItemTile/ItemTile';

const mapStateToProps = state => ({
  currentList: state.currentStore.list,
  editingEssentials: state.currentStore.editingEssentials,
  editingList: state.currentStore.editingList,
  selectingItems: state.itemSelect.selectingItems,
  movingItems: state.currentStore.movingItems,
  deletingItems: state.currentStore.deletingItems,
});

class CompletedItems extends Component {
  uncompleteItem = item => () => {
    console.log('uncomplete item:', item);
    const action = {
      type: CURRENT_STORE_ACTIONS.UNCOMPLETE_ITEM,
      payload: {...item, completed: false},
    };
    this.props.dispatch(action);
  };

  clearCompleted = () => {
    const confirmed = window.confirm('Are you sure?');
    if (confirmed) {
      const {dispatch, editingEssentials, editingList, selectingItems, movingItems, deletingItems} = this.props;
      if (editingEssentials) {
        dispatch({type: ITEM_SELECT_ACTIONS.CLEAR_SELECTED_ITEMS});
        dispatch({type: ITEM_SELECT_ACTIONS.STOP_ITEM_SELECTION_MODE});
        dispatch({type: CURRENT_STORE_ACTIONS.STOP_ESSENTIALS_EDITING_MODE});
      } else if (editingList) {
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
        dispatch({type: CURRENT_STORE_ACTIONS.STOP_LIST_EDITING_MODE});
      }
      dispatch({
        type: CURRENT_STORE_ACTIONS.CLEAR_COMPLETED,
        payload: this.props.items[0].store_id
      });
    }
  };

  render() {
    const {items} = this.props;
    return(
      <div>
        <strong>completed items</strong> 
        {items.length
        ? <button onClick={this.clearCompleted}>Clear</button>
        : null}
        <ul>
          {items.map(item => (
            <ItemTile key={item.id} 
              completedListItem
              item={item} 
              onClick={this.uncompleteItem(item)} 
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CompletedItems);