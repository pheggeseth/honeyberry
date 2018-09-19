import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../../redux/actions/currentStoreActions';
import ItemTile from '../../ItemTile/ItemTile';

const mapStateToProps = state => ({
  currentStore: state.currentStore.store,
  currentList: state.currentStore.list,
  editing: state.currentStore.editingEssentials,
});

class EssentialItems extends Component {
  addItemToCurrentItems = newItem => () => {
    const action = {};
    const existingListItem = this.props.currentList.find(currentItem => currentItem.item_id === newItem.id);
    console.log(existingListItem);
    if (existingListItem) {
      action.type = CURRENT_STORE_ACTIONS.UPDATE_ITEM_QUANTITY;
      action.payload = {
        ...existingListItem,
        quantity: existingListItem.quantity + 1
      };
    } else {
      action.type = CURRENT_STORE_ACTIONS.ADD_ITEM;
      action.payload = {
        storeId: this.props.currentStore.id,
        item: newItem,
      };
    }
    this.props.dispatch(action);
  };

  editEssentialsList = () => {
    const action = {
      type: CURRENT_STORE_ACTIONS.TOGGLE_ESSENTIAL_EDITING_MODE
    };
    this.props.dispatch(action);
  };

  render() {
    const {items} = this.props;
    return(
      <div>
        <strong>essential items</strong>
        <button onClick={this.editEssentialsList}>
          {!this.props.editing
            ? 'Edit'
            : 'Done'
          }
        </button>
        <ul>
          {items.map(item => (
            <ItemTile key={item.id} item={item} onClick={this.addItemToCurrentItems(item)} />
          ))}
        </ul>
        
      </div>
    );
  }
}

export default connect(mapStateToProps)(EssentialItems);