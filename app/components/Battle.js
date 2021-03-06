import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import PlayerPreview from "./PlayerPreview";

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
  }

  handleChange(event) {
    let value = event.target.value;

    this.setState(() => {
      return {
        username: value
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  }

  render() {
    return (
      <form className="column" onSubmit={event => this.handleSubmit(event)}>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          value={this.state.username}
          autoComplete="off"
          onChange={event => this.handleChange(event)}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}
        >
          Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: "",
      playerTwoName: "",
      playerOneImage: null,
      playerTwoImage: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(() => {
      var newState = {};

      newState[id + "Name"] = username;
      newState[id + "Image"] =
        "https://github.com/" + username + ".png?size=200";

      return newState;
    });
  }

  handleReset(id) {
    this.setState(() => {
      var newState = {};

      newState[id + "Name"] = "";
      newState[id + "Image"] = null;

      return newState;
    });
  }

  render() {
    const match = this.props.match;
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    let playerOneImage = this.state.playerOneImage;
    let playerTwoImage = this.state.playerTwoImage;

    return (
      <div>
        <div className="row">
          {!playerOneName && (
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          )}

          {playerOneImage !== null && (
            <PlayerPreview avatar={playerOneImage} username={playerOneName}>
              <button
                className="reset"
                onClick={() => this.handleReset("playerOne")}
              >
                Reset
              </button>
            </PlayerPreview>
          )}

          {!playerTwoName && (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          )}

          {playerTwoImage !== null && (
            <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
              <button
                className="reset"
                onClick={() => props.onReset("playerTwo")}
              >
                Reset
              </button>
            </PlayerPreview>
          )}
        </div>
        {playerOneImage && playerTwoImage && (
          <Link
            className="button"
            to={{
              pathname: match.url + "/results",
              // we can access it later via props
              search:
                "?playerOneName=" +
                playerOneName +
                "&playerTwoName=" +
                playerTwoName
            }}
          >
            Battle!
          </Link>
        )}
      </div>
    );
  }
}

export default Battle;
