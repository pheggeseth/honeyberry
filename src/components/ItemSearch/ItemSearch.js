import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';
import { ITEM_ACTIONS } from '../../redux/actions/itemActions';

import ItemSearchBar from './ItemSearchBar/ItemSearchBar';
import ItemSearchResults from './ItemSearchResults/ItemSearchResults';

const mapStateToProps = state => ({
  items: state.items
});

class ItemSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  startItemSearchMode = () => {
    this.props.dispatch({
      type: ITEM_ACTIONS.START_ITEM_SEARCH_MODE
    });
  }

  stopItemSearchMode = () => {
    this.props.dispatch({
      type: ITEM_ACTIONS.STOP_ITEM_SEARCH_MODE
    });
  };

  updateSearchTerm = newValue => {
    if (!this.state.searchTerm && newValue) {
      this.startItemSearchMode();
    } else if (this.state.searchTerm && !newValue) {
      this.stopItemSearchMode();
    }

    this.setState({
      searchTerm: newValue
    });
  };

  render() {
    return (
      <div>
        <ItemSearchBar value={this.state.searchTerm} 
          onChange={this.updateSearchTerm}
        />
        <ItemSearchResults searchTerm={this.state.searchTerm} />
      </div>
    );
  }
}

export default connect()(ItemSearch);