import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_LIST_ACTIONS } from '../../../redux/actions/currentListActions';

class CompletedItems extends Component {
  uncompleteItem = item => () => {
    console.log('uncomplete item:', item);
    const action = {
      type: CURRENT_LIST_ACTIONS.UPDATE_ITEM,
      payload: {...item, completed: false}
    };
    this.props.dispatch(action);
  };

  render() {
    const {items} = this.props;
    return(
      <div>
        completed items
        <ul>
          {items.map(item => (
            <li key={item.id} onClick={this.uncompleteItem(item)}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect()(CompletedItems);