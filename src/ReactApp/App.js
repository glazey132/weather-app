import React from "react";
import PropTypes from "prop-types";
import WeatherAppContainer from "./containers/WeatherAppContainer.js";
import CircularLoadingIcon from "./components/CircularLoadingIcon.js";
import { connect } from "react-redux";

import {
  fetchGeolocationSuccess,
  fetchGeolocationFailure
} from "./actions/get_geolocation";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citySearch: ""
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      if (!position) {
        const err = "could not get position on mount ";
        this.props.onLocationFail(err);
      } else {
        this.props.onLocation(
          position.coords.latitude,
          position.coords.longitude
        );
      }
    });
  }

  render() {
    if (this.props.isLocationLoading) {
      return (
        <div className="location-loading-screen">
          <div className="loading-message">
            <CircularLoadingIcon />
          </div>
        </div>
      );
    } else if (!this.props.isLocationLoading) {
      return (
        <div className="app-screen container-fluid">
          <h3> Weather Man </h3>
          <span style={{ color: "red" }}>{this.props.error}</span>
          <WeatherAppContainer />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isLocationLoading: state.geoReducer.isLocationLoading,
    error: state.geoReducer.geoError || state.weatherReducer.weatherError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLocation: (lat, long) => dispatch(fetchGeolocationSuccess(lat, long)),
    onLocationFail: error => dispatch(fetchGeolocationFailure(error))
  };
};

App.propTypes = {
  isLocationLoading: PropTypes.bool,
  error: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
