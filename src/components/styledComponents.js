import styled from 'styled-components';
import { STYLE_CONSTANTS } from '../styles/styleConstants';

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
  border: none;
  box-shadow: 0 1px 2px rgba(0,0,0,0.4) inset;
  
  flex-grow: 1;
`;

export const Button = styled.button`
  border: none;
  box-shadow: 0 1px 2px rgba(0,0,0,0.4);
  font-size: 1em;

  &:hover {
    cursor: pointer;
    filter: brightness(0.95);
  }

  &:active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.4) inset;
    filter: brightness(0.8);
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

  &.light_green {
    background-color: ${STYLE_CONSTANTS.COLORS.LIGHT_GREEN};
    color: white;
  }

  &.orange {
    background-color: ${STYLE_CONSTANTS.COLORS.ORANGE};
    color: white;
  }
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
  background-color: ${STYLE_CONSTANTS.COLORS.DARK_GREEN};
  padding: ${STYLE_CONSTANTS.CONTENT_MARGIN}px;
  padding-bottom: ${STYLE_CONSTANTS.BOTTOM_NAV_HEIGHT + STYLE_CONSTANTS.CONTENT_MARGIN}px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const TopBarContainer = styled.div`
  width: 100%;
  height: ${STYLE_CONSTANTS.TOP_BAR_HEIGHT}px;
  max-width: 768px;
  background-color: ${STYLE_CONSTANTS.COLORS.DARK_BLUE};
  color: white;
  font-size: 1.25em;
  padding-left: ${STYLE_CONSTANTS.CONTENT_MARGIN}px;
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

export const ItemSearchBarContainer = styled.div`
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
`;

export const SearchBarSpacer = styled.div`
  height: ${STYLE_CONSTANTS.SEARCH_BAR_HEIGHT}px;
`;

export const BottomNav = styled.div`
  height: ${STYLE_CONSTANTS.BOTTOM_NAV_HEIGHT}px;
  width: inherit;
  max-width: inherit;
  background-color: ${STYLE_CONSTANTS.COLORS.DARK_BLUE};
  color: white;
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
    align-items: center;
  }
  & > ul li a {
    color: white;
    text-align: center;
    text-decoration: none;
  }
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;

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

export const ItemTileContainer = styled.div`
  height: ${STYLE_CONSTANTS.TILE_SIZE}px;
  width: ${STYLE_CONSTANTS.TILE_SIZE}px;
  background-color: ${STYLE_CONSTANTS.COLORS.GREEN};
  margin: ${STYLE_CONSTANTS.TILE_MARGIN}px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  
  :hover {
    filter: brightness(0.97);
    cursor: pointer;
  }

  &.selected {
    border: 3px solid ${STYLE_CONSTANTS.COLORS.ORANGE};
    
  }

  &.inCurrentList {
    background-color: ${STYLE_CONSTANTS.COLORS.LIGHT_GREEN};
    // border: 3px solid ${STYLE_CONSTANTS.DARK_GREEN};
    box-shadow: 0 1px 2px rgba(0,0,0,0.4);
  }

  @media only screen and (max-width: ${STYLE_CONSTANTS.TOTAL_TILE_WIDTH * 3 + STYLE_CONSTANTS.CONTENT_MARGIN * 2}px) {
    width: calc((100vw - ${STYLE_CONSTANTS.CONTENT_MARGIN * 2 + STYLE_CONSTANTS.TILE_MARGIN * 6}px) / 3);
    height: calc((100vw - ${STYLE_CONSTANTS.CONTENT_MARGIN * 2 + STYLE_CONSTANTS.TILE_MARGIN * 6}px) / 3);
  }
`;

// const ItemTile = styled.div`
//   height: ${TILE_SIZE}px;
//   width: ${TILE_SIZE}px;
//   background-color: lightgreen;
//   margin: ${TILE_MARGIN}px;

//   @media only screen and (max-width: 415px) {
//     width: calc((100vw - ${CONTENT_MARGIN * 2 + TILE_MARGIN * 6}px) / 3);
//     height: calc((100vw - ${CONTENT_MARGIN * 2 + TILE_MARGIN * 6}px) / 3);
//   }
// `;