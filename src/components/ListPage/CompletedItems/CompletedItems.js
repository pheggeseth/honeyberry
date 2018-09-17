import React, { Component } from 'react';
import { connect } from 'react-redux';

class CompletedItems extends Component {
  uncompleteItem = id => () => {
    console.log('uncomplete item with id:', id);
  };

  render() {
    const {items} = this.props;
    return(
      <div>
        completed items
        <ul>
          {items.map(item => (
            <li key={item.id} onClick={this.uncompleteItem(item.id)}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect()(CompletedItems);