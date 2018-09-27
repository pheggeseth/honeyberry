import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../../redux/actions/currentStoreActions';

import { List } from '../../styledComponents';
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

  editItem = item => () => {
    console.log('edit item:', item);
    this.props.dispatch({
      type: CURRENT_STORE_ACTIONS.SET_EDITING_ITEM,
      payload: item,
    });
    this.props.dispatch({
      type: CURRENT_STORE_ACTIONS.START_ITEM_EDITING_MODE
    });
  };

  render() {
    const {items} = this.props;
    return(
      <div>
        <strong>current items</strong>
        <List>
          {items.map(item => (
            <ItemTile key={item.id} 
              currentListItem
              item={item} 
              onClick={this.completeItem(item)}
              onLongPress={this.editItem(item)} 
            />
          ))}
        </List>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CurrentItems);