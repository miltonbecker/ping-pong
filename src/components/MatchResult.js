import React, { Component } from 'react';
import { addScore } from '../redux/actions';
import { connect } from 'react-redux';

class MatchResult extends Component {

  render() {
    return (
      <div className='row'>
        <div className='col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3'>
          <h3>Inform a match's result</h3>
          <form id='comment-form' onSubmit={(event) => {
            event.preventDefault();
            this.submitCb(this.name1, this.name2, this.score1, this.score2);
          }}>

            <table className="table table-bordered">
              <thead>
                <tr className="warning">
                  <th>Player 1</th>
                  <th>Player 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type='text' placeholder='Name' className='form-control' ref={(node) => { this.name1 = node }} />
                  </td>
                  <td>
                    <input type='text' placeholder='Name' className='form-control' ref={(node) => { this.name2 = node }} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type='text' placeholder='Score (default 0)' className='form-control' ref={(node) => { this.score1 = node }} />
                  </td>
                  <td>
                    <input type='text' placeholder='Score (default 0)' className='form-control' ref={(node) => { this.score2 = node }} />
                  </td>
                </tr>
              </tbody>
            </table>

            {this.props.addingScore &&
              <button type='submit' className='btn btn-warning' disabled>Adding...</button>
            }
            {!this.props.addingScore &&
              <button type='submit' className='btn btn-warning'>Submit</button>
            }

            {this.props.addingScoreError &&
              <div className="alert alert-danger add-error" role="alert">
                Oops, there was an error adding your result.
              </div>
            }
          </form>
        </div>
      </div>
    );
  }

  submitCb(inputName1, inputName2, inputScore1, inputScore2) {
    const name1 = inputName1.value.trim();
    const name2 = inputName2.value.trim();
    const score1 = parseInt(inputScore1.value.trim()) || 0;
    const score2 = parseInt(inputScore2.value.trim()) || 0;

    if (!name1 || !name2) {
      alert('Please, make sure you\'ve fulfilled all the fields.');
      return;
    }

    if (!Number.isInteger(score1) || !Number.isInteger(score2) || score1 === score2) {
      alert('That\'s an invalid score.');
      return;
    }

    this.props.dispatch(addScore({ name1, name2, score1, score2 }));

    this.clearFields(inputName1, inputName2, inputScore1, inputScore2);
  }

  clearFields(inputName1, inputName2, inputScore1, inputScore2) {
    inputName1.value = '';
    inputName2.value = '';
    inputScore1.value = '';
    inputScore2.value = '';

    //placeholder fix
    inputScore2.focus();
    inputScore1.focus();
    inputName2.focus();
    inputName1.focus();
  }
}

const mapStateToProps = (state) => {
  return {
    addingScore: state.addingScore,
    addingScoreError: state.addingScoreError
  };
}

export default connect(mapStateToProps)(MatchResult);