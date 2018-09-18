import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  categories: state.categories,
  items: state.items,
});

class ItemsAll extends Component {
  render() {
    return (
      'all items'
    );
  }
}

export default connect(mapStateToProps)(ItemsAll);