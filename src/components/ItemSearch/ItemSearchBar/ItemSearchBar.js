import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ITEM_ACTIONS } from '../../../redux/actions/itemActions';

class ItemSearchBar extends Component {
  handleChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <div>
        <input type="text" 
          value={this.props.value} 
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default connect()(ItemSearchBar);