import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../../redux/actions/currentStoreActions';
import ItemTile from '../../ItemTile/ItemTile';

const mapStateToProps = state => ({
  currentStore: state.currentStore.store,
  currentList: state.currentStore.list,
  editingEssentials: state.currentStore.editingEssentials,
  selectedItems: state.currentStore.selectedItems,
});

class EssentialItems extends Component {
  // toggleEssentialsListEditing = () => {
  //   const {editingEssentials, selectedItems, dispatch} = this.props;
  //   if (editingEssentials) {
  //     dispatch({
  //       type: CURRENT_STORE_ACTIONS.UPDATE_ESSENTIALS_LIST,
  //       payload: {
  //         storeId: this.props.currentStore.id,
  //         list: selectedItems,
  //       }
  //     });
  //     dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_SELECTED_ITEMS});
  //     dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ITEM_SELECTION_MODE});
  //     dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ESSENTIALS_EDITING_MODE});
  //   } else {
  //     dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ESSENTIALS_EDITING_MODE});
  //     dispatch({type: CURRENT_STORE_ACTIONS.TOGGLE_ITEM_SELECTION_MODE});
  //     dispatch({
  //       type: CURRENT_STORE_ACTIONS.SET_SELECTED_ITEMS,
  //       payload: this.props.items
  //     });
  //   }
    
  // };

  startEssentialsListEditing = () => {
    const {dispatch, items} = this.props;
    dispatch({type: CURRENT_STORE_ACTIONS.START_ESSENTIALS_EDITING_MODE});
    dispatch({type: CURRENT_STORE_ACTIONS.START_ITEM_SELECTION_MODE});
    dispatch({
      type: CURRENT_STORE_ACTIONS.SET_SELECTED_ITEMS,
      payload: items
    });
  };

  stopEssentialsListEditing = () => {
    const {dispatch, currentStore, selectedItems} = this.props;
    dispatch({
      type: CURRENT_STORE_ACTIONS.UPDATE_ESSENTIALS_LIST,
      payload: {
        storeId: currentStore.id,
        list: selectedItems,
      }
    });
    dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_SELECTED_ITEMS});
    dispatch({type: CURRENT_STORE_ACTIONS.STOP_ITEM_SELECTION_MODE});
    dispatch({type: CURRENT_STORE_ACTIONS.STOP_ESSENTIALS_EDITING_MODE});
  };

  render() {
    const {items, editingEssentials} = this.props;
    return(
      <div>
        <strong>essential items</strong>
        {/* <button onClick={this.toggleEssentialsListEditing}>
          {!editingEssentials
            ? 'Edit'
            : 'Save'
          }
        </button> */}
        {editingEssentials
        ? <button onClick={this.stopEssentialsListEditing}>Save</button>
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