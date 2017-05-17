import React, { Component } from 'react';
import { fetchPlayers } from '../redux/actions';
import { connect } from 'react-redux';
import { setRankingAndCoef } from '../../rules/shared-rules';

class PlayersRanking extends Component {

  render() {
    const players = this.props.players;
    const fetchingPlayersError = this.props.fetchingPlayersError;

    if (players && players.length > 0)
      setRankingAndCoef(players);

    return (
      <div className='row'>
        <div className='col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3'>
          <h1>Players Ranking</h1>

          {((!players || !players.length) && !fetchingPlayersError) &&
            <p className='loading'>Loading...</p>}

          {fetchingPlayersError &&
            <div className="alert alert-danger" role="alert">
              Oops sorry, there was an error fetching the ranking.
            </div>
          }

          {players && players.length &&
            <div className='row'>
              <div className='col-xs-12'>
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr className="info">
                      <th>Ranking</th>
                      <th>Name</th>
                      <th>Points</th>
                      <th>Matches</th>
                      <th>Points/Matches</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player) => (
                      <tr key={player._id}>
                        <th>{player.ranking}</th>
                        <td>{player.name}</td>
                        <td>{player.points}</td>
                        <td>{player.matches}</td>
                        <td>{(player.points / player.matches).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getPlayers();
  }

}

const mapStateToProps = (state) => ({
  players: state.players,
  fetchingPlayersError: state.fetchingPlayersError
});

const mapDispatchToProps = (dispatch) => ({
  getPlayers: () => {
    dispatch(fetchPlayers());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayersRanking);