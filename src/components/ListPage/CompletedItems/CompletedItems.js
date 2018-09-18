import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../../redux/actions/currentStoreActions';
import ItemTile from '../../ItemTile/ItemTile';

class CompletedItems extends Component {
  uncompleteItem = item => () => {
    console.log('uncomplete item:', item);
    const action = {
      type: CURRENT_STORE_ACTIONS.UPDATE_ITEM,
      payload: {...item, completed: false}
    };
    this.props.dispatch(action);
  };

  clearCompleted = () => {
    const confirmed = window.confirm('Are you sure?');
    if (confirmed) {
      this.props.dispatch({
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
            <ItemTile key={item.id} item={item} onClick={this.uncompleteItem(item)} />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect()(CompletedItems);