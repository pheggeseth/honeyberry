import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';

const mapStateToProps = state => ({
  item: state.currentStore.itemToEdit
});

class ItemEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.item.quantity,
      unit: this.props.item.unit
    };
  }

  updateQuantity = event => {
    const {dispatch} = this.props;
    this.setState({
      quantity: event.target.value
    });
    dispatch({
      type: CURRENT_STORE_ACTIONS.UPDATE_EDITING_ITEM_QUANTITY,
      payload: event.target.value
    });
  };

  updateUnit = event => {
    const {dispatch, item} = this.props;
    this.setState({
      unit: event.target.value
    });
    dispatch({
      type: CURRENT_STORE_ACTIONS.UPDATE_EDITING_ITEM_UNIT,
      payload: event.target.value
    });
  };

  handleCancel = () => {
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_EDITING_ITEM});
    this.props.dispatch({type: CURRENT_STORE_ACTIONS.STOP_ITEM_EDITING_MODE});
  }

  handleSave = () => {
    const {dispatch, item} = this.props;
    dispatch({
      type: CURRENT_STORE_ACTIONS.SAVE_EDITING_ITEM_CHANGES,
      payload: item
    });
    dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_EDITING_ITEM});
    dispatch({type: CURRENT_STORE_ACTIONS.STOP_ITEM_EDITING_MODE});
  };

  render() {
    const {item} = this.props;
    return(
      <div>
        {JSON.stringify(item)}
        <div>
          {item.name}
        </div>
        <div>
          Quantity: 
          <input type="number" 
            value={this.state.quantity} 
            min="0"
            onChange={this.updateQuantity}
          />
        </div>
        <div>
          Unit:
          <input type="text"
            value={this.state.unit}
            onChange={this.updateUnit}
          />
        </div>
        <div>
          <button onClick={this.handleCancel} onTouchEnd={this.handleCancel}>Cancel</button>
          <button onClick={this.handleSave} onTouchEnd={this.handleSave}>Save</button>
        </div>
      </div>
      
    );
  }
}

export default connect(mapStateToProps)(ItemEdit);