import React, { Component } from 'react';
import { connect } from 'react-redux';

class CurrentItems extends Component {
  completeItem = id => () => {
    console.log('complete item with id:', id);
  };

  render() {
    const {items} = this.props;
    return(
      <div>
        current items
        <ul>
          {items.map(item => (
            <li key={item.id} onClick={this.completeItem(item.id)}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect()(CurrentItems);