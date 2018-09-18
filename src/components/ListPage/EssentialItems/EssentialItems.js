import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../../redux/actions/currentStoreActions';
import ItemTile from '../../ItemTile/ItemTile';

const mapStateToProps = state => ({
  currentStore: state.currentStore.store,
});

class EssentialItems extends Component {
  addItemToCurrentItems = item => () => {
    const action = {
      type: CURRENT_STORE_ACTIONS.ADD_ITEM,
      payload: {
        storeId: this.props.currentStore.id,
        item: item,
      }
    };
    this.props.dispatch(action);
  };

  render() {
    const {items} = this.props;
    return(
      <div>
        <strong>essential items</strong>
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