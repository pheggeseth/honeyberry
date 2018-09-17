import React, { Component } from 'react';
import { connect } from 'react-redux';

class CompletedItems extends Component {
  render() {
    return(
      <div>
        essential items
      </div>
    );
  }
}

export default connect()(CompletedItems);