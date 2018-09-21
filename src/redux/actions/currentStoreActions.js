export const CURRENT_STORE_ACTIONS = {
  FETCH_LIST_ITEMS: 'FETCH_LIST_ITEMS',
  FETCH_STORE_ESSENTIALS: 'FETCH_STORE_ESSENTIALS',
  SET_LIST: 'SET_LIST',
  SET_STORE_ESSENTIALS: 'SET_STORE_ESSENTIALS',
  COMPLETE_ITEM: 'COMPLETE_ITEM',
  UNCOMPLETE_ITEM: 'UNCOMPLETE_ITEM',
  UPDATE_ITEM_QUANTITY: 'UPDATE_ITEM_QUANTITY',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  ADD_ITEM: 'ADD_ITEM',
  TOGGLE_ESSENTIALS_EDITING_MODE: 'TOGGLE_ESSENTIALS_EDITING_MODE',
  TOGGLE_ITEM_EDITING_MODE: 'TOGGLE_ITEM_EDITING_MODE',
  SET_EDITING_ITEM: 'SET_EDITING_ITEM',
  CLEAR_EDITING_ITEM: 'CLEAR_EDITING_ITEM',
  UPDATE_ESSENTIALS_LIST: 'UPDATE_ESSENTIALS_LIST',
  REMOVE_ITEM: 'REMOVE_ITEM',
  TOGGLE_ITEM_SELECTION_MODE: 'TOGGLE_ITEM_SELECTION_MODE',
  SET_SELECTED_ITEMS: 'SET_SELECTED_ITEMS',
  ADD_TO_SELECTED_ITEMS: 'ADD_TO_SELECTED_ITEMS',
  REMOVE_FROM_SELECTED_ITEMS: 'REMOVE_FROM_SELECTED_ITEMS',
  CLEAR_SELECTED_ITEMS: 'CLEAR_SELECTED_ITEMS',
};

export const addItemOrUpdateQuantity = (storeId, itemList, newItem) => {
  const action = {};
  const existingListItem = itemList.find(currentItem => 
    currentItem.item_id === (newItem.item_id || newItem.id) && currentItem.completed === false
  );
  if (existingListItem) {
    action.type = CURRENT_STORE_ACTIONS.UPDATE_ITEM_QUANTITY;
    action.payload = {
      ...existingListItem,
      quantity: existingListItem.quantity + 1
    };
  } else {
    action.type = CURRENT_STORE_ACTIONS.ADD_ITEM;
    action.payload = {
      storeId: storeId,
      item: newItem,
    };
  }
  return action;
};