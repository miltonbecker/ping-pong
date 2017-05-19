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
            this.submitCb();
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
                    <input type='number' placeholder='Score' className='form-control' ref={(node) => { this.score1 = node }} />
                  </td>
                  <td>
                    <input type='number' placeholder='Score' className='form-control' ref={(node) => { this.score2 = node }} />
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

  submitCb() {
    const name1 = this.name1.value.trim();
    const name2 = this.name2.value.trim();
    const score1 = parseInt(this.score1.value.trim());
    const score2 = parseInt(this.score2.value.trim());

    if (!name1 || !name2) {
      alert('Please, make sure you\'ve fulfilled all the fields.');
      return;
    }

    if (!Number.isInteger(score1) || !Number.isInteger(score2) || score1 === score2) {
      alert('That\'s an invalid score.');
      return;
    }

    this.props.dispatch(addScore({ name1, name2, score1, score2 }));

    this.clearFields();
  }

  clearFields() {
    this.name1.value = '';
    this.name2.value = '';
    this.score1.value = '';
    this.score2.value = '';

    //placeholder fix
    this.score2.focus();
    this.score1.focus();
    this.name2.focus();
    this.name1.focus();
  }
}

const mapStateToProps = (state) => {
  return {
    addingScore: state.addingScore,
    addingScoreError: state.addingScoreError
  };
}

export default connect(mapStateToProps)(MatchResult);