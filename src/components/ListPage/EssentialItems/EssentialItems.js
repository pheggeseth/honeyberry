import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS, addItemOrUpdateQuantity } from '../../../redux/actions/currentStoreActions';
import ItemTile from '../../ItemTile/ItemTile';

const mapStateToProps = state => ({
  currentStore: state.currentStore.store,
  currentList: state.currentStore.list,
  editing: state.currentStore.editingEssentials,
});

class EssentialItems extends Component {
  addEssentialItemToCurrentItems = newItem => {
    const storeId = this.props.currentStore.id;
    const list = this.props.currentList;
    this.props.dispatch(addItemOrUpdateQuantity(storeId, list, newItem));
  };

  editEssentialsList = () => {
    const action = {
      type: CURRENT_STORE_ACTIONS.TOGGLE_ESSENTIALS_EDITING_MODE
    };
    this.props.dispatch(action);
  };

  handleClick = clickedItem => () => {
    if (this.props.editing) {
      // remove item from essentials list
      this.removeEssentialItem(clickedItem);
    } else {
      this.addEssentialItemToCurrentItems(clickedItem);
    }
  };

  removeEssentialItem = item => {
    this.props.dispatch({
      type: CURRENT_STORE_ACTIONS.REMOVE_ESSENTIAL_ITEM,
      payload: item
    });
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
            <ItemTile key={item.id} item={item} onClick={this.handleClick(item)} />
          ))}
        </ul>
        
      </div>
    );
  }
}

export default connect(mapStateToProps)(EssentialItems);