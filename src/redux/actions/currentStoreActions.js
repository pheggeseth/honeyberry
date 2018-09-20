export const CURRENT_STORE_ACTIONS = {
  FETCH_LIST_ITEMS: 'FETCH_LIST_ITEMS',
  FETCH_STORE_ESSENTIALS: 'FETCH_STORE_ESSENTIALS',
  SET_LIST: 'SET_LIST',
  SET_STORE_ESSENTIALS: 'SET_STORE_ESSENTIALS',
  UPDATE_ITEM_COMPLETED: 'UPDATE_ITEM_COMPLETED',
  UPDATE_ITEM_QUANTITY: 'UPDATE_ITEM_QUANTITY',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  ADD_ITEM: 'ADD_ITEM',
  TOGGLE_ESSENTIALS_EDITING_MODE: 'TOGGLE_ESSENTIALS_EDITING_MODE',
  ADD_ESSENTIAL_ITEM: 'ADD_ESSENTIAL_ITEM',
  REMOVE_ESSENTIAL_ITEM: 'REMOVE_ESSENTIAL_ITEM',
};

export const addItemOrUpdateQuantity = (storeId, itemList, newItem) => {
  const action = {};
  const existingListItem = itemList.find(currentItem => currentItem.item_id === (newItem.item_id || newItem.id));
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