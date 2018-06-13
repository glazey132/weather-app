import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import WindIcon from "@material-ui/icons/WbCloudy";
import HumidityIcon from "@material-ui/icons/Whatshot";
import TemperatureIcon from "@material-ui/icons/WbSunny";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class CurrentWeatherInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatureScale: "fahrenheit",
      humidity: null,
      temp: null,
      windSpeed: null,
      windDegree: null,
      weatherDescription: null
    };
  }

  async convertInfo() {
    try {
      const weatherData = await this.props.currentWeatherData;
      const windInfo = await this.props.currentWindData;
      const weatherInfo = await this.props.currentWeatherInfo;

      let temp = weatherData.temp;
      let humidity = weatherData.humidity;
      let windSpeed = windInfo.speed;
      let windDegree = windInfo.deg;
      let weatherDescription = weatherInfo.main;
      this.setState({
        temp: temp,
        humidity: humidity,
        windSpeed: windSpeed,
        windDegree: windDegree,
        weatherDescription: weatherDescription
      });
    } catch (err) {
      console.log("frontend error in weather info component ", err);
    }
  }

  componentDidMount = () => {
    this.convertInfo();
  };

  render() {
    return (
      <div className="today-weather">
        <h5>
          {this.props.location[0]}, {this.props.location[1]},{" "}
          {this.props.location[2]}
        </h5>
        Forecast: {this.state.weatherDescription}
        <br />
        <div className="weather-info-list">
          <List>
            <ListItem>
              <Avatar className="weather-info-icon">
                <TemperatureIcon />
              </Avatar>
              <ListItemText
                primary="Temperature"
                secondary={`${this.state.temp} degrees`}
              />
            </ListItem>
            <ListItem>
              <Avatar className="weather-info-icon">
                <HumidityIcon />
              </Avatar>
              <ListItemText
                primary="Humidity"
                secondary={`${this.state.humidity} percent`}
              />
            </ListItem>
            <ListItem>
              <Avatar className="weather-info-icon">
                <WindIcon />
              </Avatar>
              <ListItemText
                primary="Wind"
                secondary={`${this.state.windSpeed} mph`}
              />
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentWeatherData: state.weatherReducer.currentWeatherData,
    currentWindData: state.weatherReducer.currentWindData,
    currentWeatherInfo: state.weatherReducer.currentWeatherInfo,
    location: state.weatherReducer.location
  };
};

CurrentWeatherInfoContainer.propTypes = {
  currentWeatherData: PropTypes.object,
  currentWindData: PropTypes.object,
  currentWeatherInfo: PropTypes.object,
  location: PropTypes.array
};

export default connect(
  mapStateToProps,
  null
)(CurrentWeatherInfoContainer);
