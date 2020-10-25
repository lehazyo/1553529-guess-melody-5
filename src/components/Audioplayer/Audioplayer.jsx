import React from "react";
import PropTypes from "prop-types";

class Audioplayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();

    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    const _audio = this._audioRef.current;

    _audio.oncanplaythrough = () => this.setState({
      isLoaded: true
    });
  }

  componentDidUpdate() {
    const _audio = this._audioRef.current;

    if (this.props.isPlaying) {
      _audio.play();
    } else {
      _audio.pause();
    }
  }

  componentWillUnmount() {
    const _audio = this._audioRef.current;

    _audio.oncanplaythrough = null;
  }

  render() {
    return (
      <React.Fragment>
        <button
          onClick={this.props.onPlayButtonClick}
          className={`track__button track__button--${(this.props.isPlaying) ? `pause` : `play`}`}
          type="button"
          disabled={!this.state.isLoaded}
        />
        <audio
          loop
          ref={this._audioRef}
          src={this.props.track.src}
        />
      </React.Fragment>
    );
  }
}

Audioplayer.propTypes = {
  track: PropTypes.object.isRequired,
  onPlayButtonClick: PropTypes.func,
  isPlaying: PropTypes.bool
};

export default Audioplayer;
