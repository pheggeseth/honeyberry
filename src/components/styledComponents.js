import styled from 'styled-components';
import { STYLE_CONSTANTS } from '../styles/styleConstants';
import { Link } from 'react-router-dom';

export const ScreenContainer = styled.div`
  height: 100%;

  @media only screen 
  and (min-width: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const LoginContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LoginWindow = styled.div`
  height: 500px;
  width: 100%;
  max-width: 350px;
  background-color: ${STYLE_CONSTANTS.COLORS.DARK_GREEN};
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginWindowContentGrid = styled.div`
  display: grid;
  grid-template-rows: 75px 30px 30px 30px 30px;
  grid-gap: 20px;
`;

export const LoginWindowGridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AppLogo = styled.h1`
  font-family: Oleo Script Swash Caps, cursive;
  font-size: 3em;
  font-weight: normal;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.4);
`;

export const Input = styled.input`
  height: 100%;
  font-size: 1em;
  text-align: center;
  padding: 0;
  border: none;
  box-shadow: 0 1px 2px rgba(0,0,0,0.4) inset;
  
  flex-grow: 1;
`;

export const EditItemGrid = styled.div`
  width: 90%;
  max-width: 350px;
  height: 350px;
  text-align: center;
  background-color: ${STYLE_CONSTANTS.COLORS.GREEN};
  color: white;
  box-shadow: 0 2px 2px rgba(0,0,0,0.4);
  padding: 10px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 50px 30px 30px 30px;
  grid-gap: 10px;
`;

export const Button = styled.button`
  border: none;
  box-shadow: 0 1px 2px rgba(0,0,0,0.4);
  font-size: 1em;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }

  &:active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.4) inset;
    filter: brightness(0.7);
  }

  &.rounded {
    border-radius: 10px;
  }

  &.flat {
    box-shadow: none;
  }

  &.dark-blue {
    background-color: ${STYLE_CONSTANTS.COLORS.DARK_BLUE};
    color: white;
  }

  &.blue {
    background-color: ${STYLE_CONSTANTS.COLORS.BLUE};
    color: white;
  }

  &.light-blue {
    background-color: ${STYLE_CONSTANTS.COLORS.LIGHT_BLUE};
    color: white;
  }

  &.green {
    background-color: ${STYLE_CONSTANTS.COLORS.GREEN};
    color: white;
  }

  &.light-green {
    background-color: ${STYLE_CONSTANTS.COLORS.LIGHT_GREEN};
    color: white;
  }

  &.orange {
    background-color: ${STYLE_CONSTANTS.COLORS.ORANGE};
    color: white;
  }

  &.red {
    background-color: ${STYLE_CONSTANTS.COLORS.RED};
    color: white;
  }

  &.gray {
    background-color: ${STYLE_CONSTANTS.COLORS.GRAY};
  }
`;

export const StoresListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const StoresListItem = styled.div`
  height: 40px;
  margin-top: ${STYLE_CONSTANTS.CONTENT_MARGIN}px;
  display: flex;
  flex-direction: row;
  box-shadow: 0 1px 2px rgba(0,0,0,0.4);
`;

export const StoreName = styled.div`
  height: 100%;
  background-color: ${STYLE_CONSTANTS.COLORS.BLUE};
  color: white;
  font-size: 1.25em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-left: ${STYLE_CONSTANTS.CONTENT_MARGIN}px;
  flex-grow: 1;
  display: flex;
  align-items: center;

  ${props => {
    if (props.onClick) {
      return `
        &:hover {
          filter: brightness(0.9);
          cursor: pointer;
        }
      `;
    }
  }}
`;

export const Screen = styled.div`
  height: 100%;
  width: 100%;
  max-width: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px;

  @media only screen 
  and (min-width: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px)
  and (min-height: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px) {
    max-height: ${100 - STYLE_CONSTANTS.DESKTOP_VERTICAL_MARGIN * 2}vh;
  }
`;

export const Content = styled.div`
  min-height: calc(100% - ${STYLE_CONSTANTS.BOTTOM_NAV_HEIGHT + STYLE_CONSTANTS.CONTENT_MARGIN * 2}px);
  height: calc(100% - ${STYLE_CONSTANTS.BOTTOM_NAV_HEIGHT + STYLE_CONSTANTS.CONTENT_MARGIN * 2}px);
  background-color: ${STYLE_CONSTANTS.COLORS.DARK_GREEN};
  padding: ${STYLE_CONSTANTS.CONTENT_MARGIN}px;
  padding-bottom: ${STYLE_CONSTANTS.BOTTOM_NAV_HEIGHT + STYLE_CONSTANTS.CONTENT_MARGIN}px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-y: scroll;
`;

export const TopBarContainer = styled.div`
  width: 100%;
  height: ${STYLE_CONSTANTS.TOP_BAR_HEIGHT}px;
  max-width: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px;
  background-color: ${STYLE_CONSTANTS.COLORS.BLUE};
  color: white;
  font-size: 1.25em;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  margin-left: -${STYLE_CONSTANTS.CONTENT_MARGIN}px;
  z-index: 100;

  @media only screen 
  and (min-width: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px)
  and (min-height: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px) {
    margin-top: ${STYLE_CONSTANTS.DESKTOP_VERTICAL_MARGIN}vh;
  }
`;

export const TopBarContainerSpacer = styled.div`
  height: ${STYLE_CONSTANTS.TOP_BAR_HEIGHT}px;
`;

export const SearchBarContainer = styled.div`
  width: 100%;
  height: ${STYLE_CONSTANTS.SEARCH_BAR_HEIGHT}px;
  max-width: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px;
  margin-left: -${STYLE_CONSTANTS.CONTENT_MARGIN}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: ${STYLE_CONSTANTS.BOTTOM_NAV_HEIGHT }px;

  @media only screen 
  and (min-width: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px)
  and (min-height: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px) {
    margin-bottom: ${STYLE_CONSTANTS.DESKTOP_VERTICAL_MARGIN}vh;
  }

  & > input[type="text"] {
    height: 100%;
    flex-grow: 1;
  }
`;

export const SearchBarSpacer = styled.div`
  height: ${STYLE_CONSTANTS.SEARCH_BAR_HEIGHT}px;
  margin: 0;
`;

export const BottomNav = styled.div`
  height: ${STYLE_CONSTANTS.BOTTOM_NAV_HEIGHT}px;
  width: inherit;
  max-width: inherit;
  background-color: ${STYLE_CONSTANTS.COLORS.DARK_BLUE};
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1.25em;
  position: fixed;
  bottom: 0;
  display: flex;

  @media only screen 
  and (min-width: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px)
  and (min-height: ${STYLE_CONSTANTS.MAX_SCREEN_WIDTH}px) {
    margin-bottom: ${STYLE_CONSTANTS.DESKTOP_VERTICAL_MARGIN}vh;
  }

  & > ul {
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
  }
  & > ul li {
    width: 30%;
  }
`;

export const BottomNavLink = styled(Link)`
  background-color: ${props => props.active ? STYLE_CONSTANTS.COLORS.GREEN : 'none'};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  height: 100%;

  &:hover {
    background-color: ${props => !props.active ? STYLE_CONSTANTS.COLORS.BLUE : 'none'};
  }
`;

// export const BottomNavLink = styled.li`
//   background-color: ${props => props.active ? STYLE_CONSTANTS.COLORS.GREEN : 'none'};
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 20%;

//   ${props => (!props.active 
//     ? `&:hover {
//       background-color: ${STYLE_CONSTANTS.COLORS.BLUE};
      
//     }`
//     : '')
//   }
  
//   & > a {
//     color: white;
//     text-align: center;
//     text-decoration: none;
//   }
// `;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: ${STYLE_CONSTANTS.CONTENT_MARGIN / 2}px auto;

  @media only screen and (min-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 3 + STYLE_CONSTANTS.CONTENT_MARGIN * 2}px) {
    max-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 3}px;
  }
  @media only screen and (min-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 4 + STYLE_CONSTANTS.CONTENT_MARGIN * 2}px) {
    max-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 4}px;
  }
  @media only screen and (min-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 5 + STYLE_CONSTANTS.CONTENT_MARGIN * 2}px) {
    max-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 5}px;
  }
  @media only screen and (min-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 6 + STYLE_CONSTANTS.CONTENT_MARGIN * 2}px) {
    max-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 6}px;
  }
`;

export const CategoryLabelContainer = styled.div`
  height: 30px;
  padding: 0 ${STYLE_CONSTANTS.CONTENT_MARGIN}px;
  margin-top: ${STYLE_CONSTANTS.CONTENT_MARGIN / 2}px;
  background-color: ${STYLE_CONSTANTS.COLORS.GREEN};
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  &:hover {
    filter: brightness(0.9);
    cursor: pointer;
  }
`;

export const StoreAreaLabelContainer = styled.div`
  height: 30px;
  margin: ${STYLE_CONSTANTS.CONTENT_MARGIN / 2}px 0;
  color: white;
  display: flex;
  align-items: stretch;
`;

export const StoreAreaLabelName = styled.div`
  padding-left: ${STYLE_CONSTANTS.CONTENT_MARGIN}px;
  background-color: ${STYLE_CONSTANTS.COLORS.BLUE};
  font-weight: bold;
  letter-spacing: 1px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  &:hover {
    filter: brightness(0.9);
    cursor: pointer;
  }
`;

export const ItemTileContainer = styled.div`
  height: ${STYLE_CONSTANTS.TILE_SIZE}px;
  width: ${STYLE_CONSTANTS.TILE_SIZE}px;
  background-color: ${STYLE_CONSTANTS.COLORS.BLUE};
  margin: ${STYLE_CONSTANTS.TILE_MARGIN}px;
  box-sizing: border-box;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20% 1fr 20%;
  
  :hover {
    filter: brightness(0.9);
    cursor: pointer;
  }

  &.selected {
    border: 3px solid ${STYLE_CONSTANTS.COLORS.ORANGE};
    
  }

  &.inCurrentList {
    background-color: ${STYLE_CONSTANTS.COLORS.LIGHT_GREEN};
    box-shadow: 0 2px 2px rgba(0,0,0,0.5);
  }

  @media only screen and (max-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 3 + STYLE_CONSTANTS.CONTENT_MARGIN * 2}px) {
    width: calc((100vw - ${STYLE_CONSTANTS.CONTENT_MARGIN * 2 + STYLE_CONSTANTS.TILE_MARGIN * 6}px) / 3);
    height: calc((100vw - ${STYLE_CONSTANTS.CONTENT_MARGIN * 2 + STYLE_CONSTANTS.TILE_MARGIN * 6}px) / 3);
  }
`;

export const ItemIcon = styled.div`
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;

  & > img {
    margin: ${STYLE_CONSTANTS.CONTENT_MARGIN}px;
    width: calc(100% - ${STYLE_CONSTANTS.CONTENT_MARGIN * 2}px);
    max-height: calc(100% - ${STYLE_CONSTANTS.CONTENT_MARGIN * 2}px);
  }
`;

export const ItemName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${STYLE_CONSTANTS.COLORS.DARK_BLUE};
  color: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  grid-column: 1 / span 2;
  grid-row: 3 / span 1;
`;

export const ItemBadgeContainer = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  display: flex;
`;

export const ItemBadge = styled.div`
  background-color: ${STYLE_CONSTANTS.COLORS.RED};
  color: white;
  font-size: 0.8em;
  padding: 0 ${STYLE_CONSTANTS.CONTENT_MARGIN / 2}px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;