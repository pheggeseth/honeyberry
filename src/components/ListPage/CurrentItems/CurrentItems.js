import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../../redux/actions/currentStoreActions';

import ItemTile from '../../ItemTile/ItemTile';

const mapStateToProps = state => ({
  currentList: state.currentStore.list,
});

class CurrentItems extends Component {
  completeItem = item => () => {
    console.log('complete item:', item);
    const action = {
      type: CURRENT_STORE_ACTIONS.COMPLETE_ITEM,
      payload: {...item, completed: true},
      list: this.props.currentList
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
            <ItemTile key={item.id} item={item} onClick={this.completeItem(item)} />
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CurrentItems);