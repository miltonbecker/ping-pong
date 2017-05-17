import * as actions from './actions';
import { combineReducers } from 'redux';

const players = (state = [], action) => {
  switch (action.type) {
    case actions.FETCHED_PLAYERS:
      return [
        ...action.result
      ];
    default:
      return state;
  }
};

const fetchingPlayersError = (state = false, action) => {
  switch (action.type) {
    case actions.FETCHING_PLAYERS_ERROR:
      return true;
    case actions.CLEAR_ERRORS:
      return false;
    default:
      return state;
  }
};

const addingScore = (state = false, action) => {
  switch (action.type) {
    case actions.ADDING_SCORE:
      return true;
    case actions.ADDED_SCORE_SUCCESSFULLY:
    case actions.ADDING_SCORE_ERROR:
      return false;
    default:
      return state;
  }
};

const addingScoreError = (state = false, action) => {
  switch (action.type) {
    case actions.ADDING_SCORE_ERROR:
      return true;
    case actions.ADDED_SCORE_SUCCESSFULLY:
    case actions.CLEAR_ERRORS:
      return false;
    default:
      return state;
  }
};

const pingPongApp = combineReducers({
  players,
  fetchingPlayersError,
  addingScore,
  addingScoreError
});

export default pingPongApp;