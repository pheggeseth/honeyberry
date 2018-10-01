import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';

import { EditItemGrid, Button } from '../styledComponents';

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
    this.setState({
      quantity: event.target.value
    });
    this.props.dispatch({
      type: CURRENT_STORE_ACTIONS.UPDATE_EDITING_ITEM_QUANTITY,
      payload: event.target.value
    });
  };

  updateUnit = event => {
    this.setState({
      unit: event.target.value
    });
    this.props.dispatch({
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
      <EditItemGrid>
        <div>
          <img style={{margin: '10px', width: 'calc(100% - 20px)', maxHeight: 'calc(100% - 20px)'}} src={item.icon_path} alt={item.name}/>
        </div>
        <div style={{fontSize: '2em'}}>
          {item.name}
        </div>
        <div>
          <span style={{fontSize: '1.25em', marginRight: '10px'}}>Quantity:</span> 
          <input type="number" style={{width: '40px'}}
            value={this.state.quantity} 
            min="0"
            onChange={this.updateQuantity}
          />
        </div>
        <div>
        <span style={{fontSize: '1.25em', marginRight: '10px'}}>Unit:</span>
          <input type="text" style={{width: '100px'}}
            value={this.state.unit}
            onChange={this.updateUnit}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button style={{marginRight: '10px'}} onClick={this.handleCancel} onTouchEnd={this.handleCancel}>Cancel</Button>
          <Button className="dark-blue" onClick={this.handleSave} onTouchEnd={this.handleSave}>Save</Button>
        </div>
      </EditItemGrid>
    );
  }
}

export default connect(mapStateToProps)(ItemEdit);