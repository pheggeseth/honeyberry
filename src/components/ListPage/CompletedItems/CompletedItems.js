import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_LIST_ACTIONS } from '../../../redux/actions/currentListActions';
import ItemTile from '../../ItemTile/ItemTile';

class CompletedItems extends Component {
  uncompleteItem = item => () => {
    console.log('uncomplete item:', item);
    const action = {
      type: CURRENT_LIST_ACTIONS.UPDATE_ITEM,
      payload: {...item, completed: false}
    };
    this.props.dispatch(action);
  };

  clearCompleted = () => {
    const confirmed = window.confirm('Are you sure?');
    if (confirmed) {
      this.props.dispatch({
        type: CURRENT_LIST_ACTIONS.CLEAR_COMPLETED,
        payload: this.props.items[0].store_id
      });
    }
  };

  render() {
    const {items} = this.props;
    return(
      <div>
        completed items <button onClick={this.clearCompleted}>Clear</button>
        <ul>
          {items.map(item => (
            // <li key={item.id} onClick={this.uncompleteItem(item)}>{item.name}</li>
            <ItemTile key={item.id} item={item} onClick={this.uncompleteItem(item)} />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect()(CompletedItems);