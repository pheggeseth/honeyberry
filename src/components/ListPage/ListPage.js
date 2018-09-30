import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CURRENT_STORE_ACTIONS } from '../../redux/actions/currentStoreActions';
import { ITEM_ACTIONS } from '../../redux/actions/itemActions';
import { ITEM_SELECT_ACTIONS } from '../../redux/actions/itemSelectActions';

import ItemEdit from '../ItemEdit/ItemEdit';
import CurrentItems from './CurrentItems/CurrentItems';
import CompletedItems from './CompletedItems/CompletedItems';
import EssentialItems from './EssentialItems/EssentialItems';
import ItemsAll from '../ItemsAll/ItemsAll';
import ListPageTopBar from '../ListPage/ListPageTopBar';
import ItemSearchBar from '../ItemSearch/ItemSearchBar/ItemSearchBar';
import ItemSearchResults from '../ItemSearch/ItemSearchResults/ItemSearchResults';
// import ListEditMenu from './ListEditMenu/ListEditMenu';
import { TopBarContainerSpacer, SearchBarSpacer } from '../styledComponents';


const mapStateToProps = state => ({
  user: state.user,
  currentStore: state.currentStore.store,
  list: state.currentStore.list,
  essentials: state.currentStore.essentials,
  editingEssentials: state.currentStore.editingEssentials,
  searching: state.itemSearch.searching,
  editingItem: state.currentStore.editingItem,
  selectingItems: state.itemSelect.selectingItems,
  areas: state.currentStore.areas,
});

class ListPage extends Component {
  componentDidMount() {
    const {dispatch, currentStore} = this.props;
    dispatch({type: USER_ACTIONS.FETCH_USER});

    if (currentStore.id) {
      dispatch({
        type: CURRENT_STORE_ACTIONS.FETCH_LIST_ITEMS,
        payload: currentStore.id
      });
      dispatch({
        type: CURRENT_STORE_ACTIONS.FETCH_STORE_ESSENTIALS,
        payload: currentStore.id
      });
      dispatch({
        type: CURRENT_STORE_ACTIONS.FETCH_STORE_AREAS,
        payload: currentStore.id
      });
    }
  }

  componentDidUpdate() {
    const {user, history} = this.props;
    if (!user.isLoading && user.userName === null) {
      history.push('home');
    }
  }

  componentWillUnmount() {
    const {searching, selectingItems, editingEssentials, editingItem, dispatch} = this.props;
    if (searching) {
      dispatch({type: ITEM_ACTIONS.CLEAR_ITEM_SEARCH_TERM});
      dispatch({type: ITEM_ACTIONS.STOP_ITEM_SEARCH_MODE});
    }
    if (selectingItems) {
      dispatch({type: ITEM_SELECT_ACTIONS.CLEAR_SELECTED_ITEMS});
      dispatch({type: ITEM_SELECT_ACTIONS.STOP_ITEM_SELECTION_MODE});
    }
    if (editingEssentials) {
      dispatch({type: CURRENT_STORE_ACTIONS.STOP_ESSENTIALS_EDITING_MODE});
    }
    if (editingItem) {
      dispatch({type: CURRENT_STORE_ACTIONS.CLEAR_EDITING_ITEM});
      dispatch({type: CURRENT_STORE_ACTIONS.STOP_ITEM_EDITING_MODE});
    }
  }

  

  render() {
    let content = null;
    const {list, searching, editingItem, essentials, areas, user} = this.props;

    let sortedList = [];
    let currentItems;
    let completedItems;
    if (list.length && areas.length) {
      console.log('list:', list);
      const areaItems = areas.reduce((array, area) => array.concat(area.items) , []);
      console.log('areaItems:', areaItems);
      // list.sort((itemA, itemB) => {
      //   // debugger;
      //   const areaItemIndexOfA = areaItems.findIndex(areaItem => areaItem.id === itemA.item_id);
      //   const areaItemIndexOfB = areaItems.findIndex(areaItem => areaItem.id === itemB.item_id);
      //   if (areaItemIndexOfA < 0 && areaItemIndexOfB) {
      //     return 1;
      //   } else if (areaItemIndexOfA && areaItemIndexOfB < 0) {
      //     return -1;
      //   } else if (areaItemIndexOfA < 0 && areaItemIndexOfB < 0){
      //     return 0;
      //   } else {
      //     return areaItemIndexOfA - areaItemIndexOfB;
      //   }
      // });
      const listToSort = [...list];
      
      areaItems.forEach(areaItem => {
        const listIndexFound = listToSort.findIndex(listItem => listItem.item_id === areaItem.id);
        // console.log('areaItem:', areaItem);
        // console.log('listIndexFound:', listIndexFound);
        if (listIndexFound > -1) {
          const listItem = listToSort.splice(listIndexFound, 1)[0];
          // console.log('listItem:', listItem);
          sortedList.push(listItem);
          // console.log('sortedList:', sortedList);
          // console.log('listToSort:', listToSort);
        }
      });

      if (listToSort.length) {
        // console.log('listToSort has length:', listToSort)
        sortedList = sortedList.concat(listToSort);
      }
    }

    if (sortedList.length) {
      currentItems = sortedList.filter(item => !item.completed);
      completedItems = sortedList.filter(item => item.completed);
    } else {
      currentItems = list.filter(item => !item.completed);
      completedItems = list.filter(item => item.completed);
    }
    
    if (editingItem) {
      content = (
        <div>
          <ItemEdit />
        </div>
      );
    } else {
      content = (
        <div>
          <ListPageTopBar history={this.props.history}/>
          <TopBarContainerSpacer />
          {/* <ListEditMenu /> */}
          {searching
          ? <ItemSearchResults />
          : <div>
              <CurrentItems items={currentItems} />
              {completedItems.length ? <CompletedItems items={completedItems} /> : null}
              <EssentialItems items={essentials.sort(byNameAlphabetically)} />
              <ItemsAll />
            </div>}
          <SearchBarSpacer />
          <ItemSearchBar />
        </div>
      );
    }

    return (
      <div>        
        { user.userName ? content : null }
      </div>
    );
  }
}

const byNameAlphabetically = (object1, object2) => {
  let name1 = object1.name.toUpperCase();
  let name2 = object2.name.toUpperCase();
  if (name1 < name2) return -1;
  if (name1 > name2) return 1;
  
  return 0;
};

export default connect(mapStateToProps)(ListPage);
