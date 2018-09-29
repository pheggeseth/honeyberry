import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CURRENT_STORE_ACTIONS, addItemOrUpdateQuantity } from '../../redux/actions/currentStoreActions';
import { ITEM_SELECT_ACTIONS } from '../../redux/actions/itemSelectActions';
import { ITEM_ACTIONS } from '../../redux/actions/itemActions';

// import styled from 'styled-components';
import { 
  ItemTileContainer, 
  ItemIcon, 
  ItemName,
  ItemBadgeContainer,
  ItemBadge,
} from '../styledComponents';



const mapStateToProps = state => ({
  currentStore: state.currentStore.store,
  currentList: state.currentStore.list,
  editingEssentials: state.currentStore.editingEssentials,
  selectingItems: state.itemSelect.selectingItems,
  selectedItems: state.itemSelect.selectedItems,
  editingList: state.currentStore.editingList,
  editingStoreSettings: state.currentStore.editingStoreSettings,
  editingAreaId: state.currentStore.editingAreaId,
});



class ItemTile extends Component {
  longPressed = false;

  itemIsCurrentlySelected = item => {
    const {
      categoryItem, 
      selectedItems, 
      editingEssentials, 
      essentialItem, 
      editingList, 
      currentListItem, 
      completedListItem,
      // areas, 
      areaItem,
      editingAreaId,
    } = this.props;

    if (editingEssentials && (essentialItem || categoryItem)) {
      return selectedItems.some(selectedItem => (selectedItem.item_id || selectedItem.id) === (item.item_id || item.id));
    } else if (editingAreaId && (areaItem || categoryItem)) {
      return selectedItems.some(selectedItem => (selectedItem.item_id || selectedItem.id) === (item.item_id || item.id));
    } else if(editingList && (currentListItem || completedListItem)) {
      return selectedItems.some(selectedItem => selectedItem.id === item.id);
    } else {
      return false;
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
    const {dispatch} = this.props;
    console.log('uncomplete item:', item);
    dispatch({
      type: CURRENT_STORE_ACTIONS.UNCOMPLETE_ITEM,
      payload: item
    });
  };

  addItemToCurrentList = item => {
    const {dispatch, currentStore, currentList} = this.props;
    console.log('adding item to list:', item);
    dispatch(addItemOrUpdateQuantity(currentStore.id, currentList, item));
  };

  handleClick = () => {
    const {currentListItem, completedListItem, essentialItem, categoryItem, searchResult, areaItem} = this.props;
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
    } else if (areaItem) {
      this.handleAreaItemClick();
    }
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
    const {editingEssentials, selectingItems, editingList, item} = this.props;
    if (editingEssentials && selectingItems) {
      if (this.itemIsCurrentlySelected(item)) {
        this.deselectItem(item)
      } else {
        this.selectItem(item);
      }
    } else if (!editingList) {
      this.addItemToCurrentList(item)
    }
  };

  handleCategoryItemClick = () => {
    const {
      editingEssentials, 
      selectingItems, 
      item, 
      editingList,
      editingStoreSettings,
      editingAreaId,
    } = this.props;
    if ((editingEssentials && selectingItems) || (editingAreaId && selectingItems)) {
      if (this.itemIsCurrentlySelected(item)) {
        this.deselectItem(item);
      } else {
        this.selectItem(item);
      }
    } else if (!editingStoreSettings && !editingList) {
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

  handleAreaItemClick = () => {
    const {selectingItems, editingAreaId, item} = this.props;
    if (selectingItems && editingAreaId === item.area_id) {
      if (this.itemIsCurrentlySelected(item)) {
        this.deselectItem(item);
      } else {
        this.selectItem(item);
      }
    }
  };
  
  handleLongPress = () => {
    this.longPressed = true;
    if (this.props.onLongPress) {
      this.props.onLongPress();
    }
  }

  handlePressStart = () => {
    this.pressTimer = setTimeout(this.handleLongPress, 1000);
  };

  handlePressEnd = () => {
    if (this.longPressed) {
      this.longPressed = false;
    } else {
      this.handleClick();
      clearTimeout(this.pressTimer);
    }
  };

  selectItem = item => {
    this.props.dispatch({
      type: ITEM_SELECT_ACTIONS.ADD_TO_SELECTED_ITEMS,
      payload: item,
    });
  };

  deselectItem = item => {
    this.props.dispatch({
      type: ITEM_SELECT_ACTIONS.REMOVE_FROM_SELECTED_ITEMS,
      payload: item
    });
  }

  render() {
    const {currentList, selectingItems, editingStoreSettings, item} = this.props;
    let className;

    if (selectingItems && this.itemIsCurrentlySelected(item)) {
      className = 'selected';
    } else if (!editingStoreSettings && !selectingItems && !item.completed && itemIsInCurrentList(currentList, item)) {
      className = 'inCurrentList';
    }

    return (
      <ItemTileContainer 
        className={className}
        onMouseDown={this.handlePressStart}
        onMouseUp={this.handlePressEnd}
        onTouchStart={this.handlePressStart}
        onTouchEnd={this.handlePressEnd}
      >
        <ItemIcon>
          <img src={item.icon_path} alt={item.name}/>
        </ItemIcon>
        <ItemName>{item.name}</ItemName>
        {className !== 'selected' 
        ? quantityUnitBadgeForItemsInCurrentList(currentList, item)
        : null}
        {/* {className !== 'selected'
        ? unitBadgeForItemsInCurrentList(currentList, item)
        : null} */}
      </ItemTileContainer>
    );
  }
}

const itemIsInCurrentList = (list, item) => list.some(listItem => !listItem.completed && listItem.item_id === (item.item_id || item.id));

const quantityUnitBadgeForItemsInCurrentList = (list, item) => {
  const itemFoundInList = list.find(listItem => listItem.item_id === (item.item_id || item.id));
  if (!itemFoundInList) return null;
  
  const {quantity, unit} = itemFoundInList;
  let content = [];
  if (quantity > 1) content.push(quantity);
  if (unit) {
    if (quantity > 1 && unit[unit.length-1] !== 's') {
      content.push(unit + 's');
    } else {
      content.push(unit);
    }
  }

  if (content.length) {
    return (
      <ItemBadgeContainer>
        <ItemBadge>{content.join(' ')}</ItemBadge>
      </ItemBadgeContainer>
    );
  } else {
    return null;
  }





  // if (itemFoundInList && itemFoundInList.quantity > 1) {
  //   let content = itemFoundInList.quantity;
  //   console.log('unit:', itemFoundInList);
  //   if (itemFoundInList.unit) {
  //     content += ' ' + itemFoundInList.unit;
  //     if (itemFoundInList.quantity > 1)
  //     // console.log('content is:', content + itemFoundInList.unit);
  //   }
  //   return (
  //     <ItemBadgeContainer>
  //       <ItemBadge>{content}</ItemBadge>
  //     </ItemBadgeContainer>
  //   );
  // } else {
  //   return null;
  // }
};

// const unitBadgeForItemsInCurrentList = (list, item) => {
//   const itemFoundInList = list.find(listItem => listItem.item_id === (item.item_id || item.id));
//   if (itemFoundInList && itemFoundInList.unit) {
//     let unit = itemFoundInList.unit;
//     if (unit !== '' && itemFoundInList.quantity > 1) unit += 's';
//     return <ItemUnit>{unit}</ItemUnit>;
//   } else {
//     return null;
//   }
// };

export default connect(mapStateToProps)(ItemTile);