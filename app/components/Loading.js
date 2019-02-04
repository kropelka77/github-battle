import React from "react";
import PropTypes from "prop-types";

var styles = {
  content: {
    textAlign: "center",
    fontSize: "35px"
  }
};

// Loading is a highly reusable component becasue we can modify its text and speed, or have default values otherwise

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    };
  }

  // For animated dots after Loading
  componentDidMount() {
    const stopper = this.props.text + "...";

    // With intervals we can run a function after every amount of milliseconds
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState(() => {
          return {
            text: this.props.text
          };
        });
      } else {
        this.setState(prevState => {
          //whenever you want to set the new state based on the old state
          return {
            text: prevState.text + "."
          };
        });
      }
    }, this.props.speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <p style={styles.content}>{this.state.text}</p>;
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300
};

export default Loading;
