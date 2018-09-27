import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';

const mapStateToProps = state => ({
  item: state.currentStore.itemToEdit
});

class ItemEdit extends Component {
  handleCancel = () => {
    this.props.dispatch({
      type: CURRENT_STORE_ACTIONS.CLEAR_EDITING_ITEM
    });
    this.props.dispatch({
      type: CURRENT_STORE_ACTIONS.STOP_ITEM_EDITING_MODE
    });
  }

  handleSave = () => {
    this.props.dispatch({
      type: CURRENT_STORE_ACTIONS.STOP_ITEM_EDITING_MODE
    });
  };

  render() {
    return(
      <div>
        {JSON.stringify(this.props.item)}
        <button onClick={this.handleCancel} onTouchEnd={this.handleCancel}>Cancel</button>
        <button onClick={this.handleSave} onTouchEnd={this.handleSave}>Save</button>
      </div>
      
    );
  }
}

export default connect(mapStateToProps)(ItemEdit);