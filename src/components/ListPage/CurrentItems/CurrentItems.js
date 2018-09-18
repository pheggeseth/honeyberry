import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_LIST_ACTIONS } from '../../../redux/actions/currentListActions';

class CurrentItems extends Component {
  completeItem = item => () => {
    console.log('complete item:', item);
    const action = {
      type: CURRENT_LIST_ACTIONS.UPDATE_ITEM,
      payload: {...item, completed: true}
    };
    this.props.dispatch(action);
  };

  render() {
    const {items} = this.props;
    return(
      <div>
        current items
        <ul>
          {items.map(item => (
            <li key={item.id} onClick={this.completeItem(item)}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect()(CurrentItems);