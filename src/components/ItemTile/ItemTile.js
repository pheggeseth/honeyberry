import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CURRENT_STORE_ACTIONS, addItemOrUpdateQuantity } from '../../redux/actions/currentStoreActions';
import { ITEM_ACTIONS } from '../../redux/actions/itemActions';

const Container = styled.li`
  height: 100px;
  width: 100px;
  background-color: white;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  
  :hover {
    filter: brightness(0.95);
    cursor: pointer;
  }

  &.selected {
    border: 3px solid lightpink;
  }

  &.inCurrentList {
    border: 3px solid lightgreen;
  }
`;

const mapStateToProps = state => ({
  currentStore: state.currentStore.store,
  currentList: state.currentStore.list,
  // essentials: state.currentStore.essentials,
  editingEssentials: state.currentStore.editingEssentials,
  selectingItems: state.currentStore.selectingItems,
  selectedItems: state.currentStore.selectedItems,
});



class ItemTile extends Component {
  longPressed = false;

  itemIsCurrentlySelected = item => {
    const {categoryItem, selectedItems, editingEssentials, essentialItem} = this.props;
    if (editingEssentials && categoryItem) {
      return selectedItems.some(selectedItem => (selectedItem.item_id || selectedItem.id) === item.id);
    } else if (editingEssentials && essentialItem) {
      return selectedItems.some(selectedItem => (selectedItem.item_id || selectedItem.id) === item.item_id);
    }
  };

  completeCurrentListItem = item => {
    const {dispatch, currentList} = this.props;
    console.log('complete item:', item);
    dispatch({
      type: CURRENT_STORE_ACTIONS.COMPLETE_ITEM,
      payload: {...item, completed: true},
      list: currentList
    });
  };

  uncompleteCurrentListItem = item => {
    const {dispatch, currentList} = this.props;
    console.log('uncomplete item:', item);
    dispatch({
      type: CURRENT_STORE_ACTIONS.UNCOMPLETE_ITEM,
      payload: item
    });
  };

  addItemToCurrentList = item => {
    const {dispatch, currentStore, currentList} = this.props;
    dispatch(addItemOrUpdateQuantity(currentStore.id, currentList, item));
  };

  handleClick = () => {
    const {editingEssentials, selectingItems, essentialItem, searchResult, categoryItem, currentListItem, completedListItem, item, dispatch} = this.props;
    if (currentListItem) {
      this.handleCurrentListItemClick();
    } else if (completedListItem) {
      this.handleCompletedListItemClick();
    } else if (essentialItem) {
      this.handleEssentialItemClick();
    } else if (categoryItem) {
      this.handleCategoryItemClick();
    } else if (searchResult) {
      this.handleSearchResultClick();
    }


    // if (editingEssentials && (essentialItem || categoryItem)) {
    //   if (this.itemIsCurrentlySelected(item)) {
    //     this.deselectItem(item)
    //   } else {
    //     this.selectItem(item);
    //   }
    // } else if (currentListItem) {
    //   if (selectingItems) {
    //     if (this.itemIsCurrentlySelected(item)) {
    //       this.deselectItem(item);
    //     } else {
    //       this.selectItem(item);
    //     }
    //   } else {
    //     this.completeCurrentListItem(item);
    //   }
    // } else if (completedListItem) {
    //   this.uncompleteCurrentListItem(item);
    // } else if (searchResult) {
    //   dispatch({type: ITEM_ACTIONS.CLEAR_ITEM_SEARCH_TERM});
    //   dispatch({type: ITEM_ACTIONS.STOP_ITEM_SEARCH_MODE});
    //   this.addItemToCurrentList(item);
    // } else if (essentialItem || categoryItem) {
    //   this.addItemToCurrentList(item);
    // }
  };

  handleCurrentListItemClick = () => {
    const {editingEssentials, selectingItems, item} = this.props;
    if (selectingItems && !editingEssentials) {
      if (this.itemIsCurrentlySelected(item)) {
        this.deselectItem(item);
      } else {
        this.selectItem(item);
      }
    } else if (!selectingItems) {
      this.completeCurrentListItem(item);
    }
  };

  handleCompletedListItemClick = () => {
    const {selectingItems, item} = this.props;
    if (!selectingItems) {
      this.uncompleteCurrentListItem(item);
    }
  };

  handleEssentialItemClick = () => {
    const {editingEssentials, selectingItems, item} = this.props;
    if (editingEssentials && selectingItems) {
      if (this.itemIsCurrentlySelected(item)) {
        this.deselectItem(item)
      } else {
        this.selectItem(item);
      }
    } else {
      this.addItemToCurrentList(item)
    }
  };

  handleCategoryItemClick = () => {
    const {editingEssentials, selectingItems, item} = this.props;
    if (editingEssentials && selectingItems) {
      if (this.itemIsCurrentlySelected(item)) {
        this.deselectItem(item);
      } else {
        this.selectItem(item);
      }
    } else {
      this.addItemToCurrentList(item);
    }
  };

  handleSearchResultClick = () => {
    const {selectingItems, dispatch, item} = this.props;
    if (!selectingItems) {
      dispatch({type: ITEM_ACTIONS.CLEAR_ITEM_SEARCH_TERM});
      dispatch({type: ITEM_ACTIONS.STOP_ITEM_SEARCH_MODE});
      this.addItemToCurrentList(item);
    }
  };
  
  handleLongPress = () => {
    this.longPressed = true;
    // console.log('long press');
    if (this.props.onLongPress) {
      this.props.onLongPress();
    }
  }

  handlePressStart = () => {
    // console.log('press start');
    this.pressTimer = setTimeout(this.handleLongPress, 1000);
  };

  handlePressEnd = () => {
    // console.log('press end');
    if (this.longPressed) {
      this.longPressed = false;
    } else {
      this.handleClick();
      clearTimeout(this.pressTimer);
    }
  };

  selectItem = item => {
    this.props.dispatch({
      type: CURRENT_STORE_ACTIONS.ADD_TO_SELECTED_ITEMS,
      payload: item,
    });
  };

  deselectItem = item => {
    this.props.dispatch({
      type: CURRENT_STORE_ACTIONS.REMOVE_FROM_SELECTED_ITEMS,
      payload: item
    });
  }
  // addEssentialItem = item => {
  //   this.props.dispatch({
  //     type: CURRENT_STORE_ACTIONS.ADD_ESSENTIAL_ITEM,
  //     payload: {
  //       storeId: this.props.currentStore.id,
  //       item: item
  //     }
  //   });
  // };

  // removeEssentialItem = item => {
  //   this.props.dispatch({
  //     type: CURRENT_STORE_ACTIONS.REMOVE_ESSENTIAL_ITEM,
  //     payload: item
  //   });
  // };

  render() {
    const {currentList, selectingItems, selectedItems, item, currentItem, essentialItem} = this.props;
    let className;
    if (selectingItems && this.itemIsCurrentlySelected(item)) {
      className = 'selected';
    } else if (!selectingItems && !item.completed && currentList.some(listItem => !listItem.completed && listItem.item_id === (item.item_id || item.id))) {
      className = 'inCurrentList';
    }
    return (
      <Container 
        className={className}
        onMouseDown={this.handlePressStart}
        onMouseUp={this.handlePressEnd}
        onTouchStart={this.handlePressStart}
        onTouchEnd={this.handlePressEnd}
      >
        {this.props.item.name + (this.props.item.quantity > 1 ? ' '+this.props.item.quantity : '')}
      </Container>
    );
  }
}

export default connect(mapStateToProps)(ItemTile);