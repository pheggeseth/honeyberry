import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../../redux/actions/currentStoreActions';
import { ITEM_SELECT_ACTIONS } from '../../../redux/actions/itemSelectActions';
import ItemTile from '../../ItemTile/ItemTile';

const mapStateToProps = state => ({
  currentStore: state.currentStore.store,
  currentList: state.currentStore.list,
  editingEssentials: state.currentStore.editingEssentials,
  selectedItems: state.itemSelect.selectedItems,
});

class EssentialItems extends Component {
  startEssentialsListEditing = () => {
    const {dispatch, items} = this.props;
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
        <strong>essential items</strong>
        {editingEssentials
        ? (<span>
            <button onClick={this.stopEssentialsListEditing}>Undo</button>
            <button onClick={this.updateEssentialsList}>Save</button>
          </span>)
        : <button onClick={this.startEssentialsListEditing}>Edit</button>
        }
        <ul>
          {items.map(item => (
            <ItemTile key={item.id} 
              essentialItem
              item={item} 
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(EssentialItems);