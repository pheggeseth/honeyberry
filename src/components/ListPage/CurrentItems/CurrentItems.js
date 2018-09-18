import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../../redux/actions/currentStoreActions';

import ItemTile from '../../ItemTile/ItemTile';


class CurrentItems extends Component {
  completeItem = item => () => {
    console.log('complete item:', item);
    const action = {
      type: CURRENT_STORE_ACTIONS.UPDATE_ITEM,
      payload: {...item, completed: true}
    };
    this.props.dispatch(action);
  };

  render() {
    const {items} = this.props;
    return(
      <div>
        <strong>current items</strong>
        <ul>
          {items.map(item => (
            // <li key={item.id} onClick={this.completeItem(item)}>{item.name}</li>
            <ItemTile key={item.id} item={item} onClick={this.completeItem(item)} />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect()(CurrentItems);