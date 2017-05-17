export const FETCHED_PLAYERS = 'FETCHED_PLAYERS';
export const FETCHING_PLAYERS_ERROR = 'FETCHING_PLAYERS_ERROR';

export const ADDING_SCORE = 'ADDING_SCORE';
export const ADDED_SCORE_SUCCESSFULLY = 'ADDED_SCORE_SUCCESSFULLY';
export const ADDING_SCORE_ERROR = 'ADDING_SCORE_ERROR';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const fetchedPlayers = (json) => ({
  type: FETCHED_PLAYERS,
  result: json
});
const fetchingPlayersError = () => ({
  type: FETCHING_PLAYERS_ERROR
});

const addingScore = () => ({
  type: ADDING_SCORE
});
const addedScoreSuccessfully = (json) => ({
  type: ADDED_SCORE_SUCCESSFULLY,
  result: json
});
const addingScoreError = () => ({
  type: ADDING_SCORE_ERROR
});

const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const fetchPlayers = () => (dispatch) => {
  dispatch(clearErrors());

  return $.ajax('/api/getPlayers', {
    type: 'GET',
    contentType: 'application/json'
  })
    .done((data) => {
      dispatch(fetchedPlayers(data));
    })
    .fail((jqObj, error, statusText) => {
      dispatch(fetchingPlayersError());
    });
};

export const addScore = (obj) => (dispatch) => {
  dispatch(clearErrors());
  
  dispatch(addingScore());

  return $.ajax('/api/addScore', {
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(obj)
  })
    .done((data) => {
      dispatch(addedScoreSuccessfully());
      dispatch(fetchPlayers());
    })
    .fail((jqObj, error, statusText) => {
      dispatch(addingScoreError());
    });
};
