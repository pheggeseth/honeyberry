import React, { Component } from 'react';

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
          placeholder="Search"
        />
      </div>
    );
  }
}

export default ItemSearchBar;