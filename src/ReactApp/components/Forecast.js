import React from "react";

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: null,
      imagePath: null,
      hiTemp: null,
      lowTemp: null
    };
  }

  async getImage() {
    try {
      let imagePath;
      const iconInfo = await this.props.imageDescription;
      const iconDescription = await iconInfo[0].description;
      let hiTemp = Math.round(this.props.hiTemp);
      let lowTemp = Math.round(this.props.lowTemp);

      switch (iconDescription) {
        case "clear sky":
          imagePath = "../../../weatherImgs/day.svg";
          break;
        case "few clouds":
          imagePath = "../../../weatherImgs/cloudy-day-1.svg";
          break;
        case "scattered clouds":
          imagePath = "../../../weatherImgs/cloudy.svg";
          break;
        case "broken clouds":
          imagePath = "../../../weatherImgs/cloudy";
          break;
        case "shower rain":
          imagePath = "../../../weatherImgs/rainy-6.svg";
          break;
        case "rain":
          imagePath = "../../../rainy-1.svg";
          break;
        case "thunderstorm":
          imagePath = "../../../weatherImgs/thunder.svg";
          break;
        case "snow":
          imagePath = "../../../weatherImgs/snowy1.svg";
          break;
        case "mist":
          imagePath = "../../../weatherImgs/rainy-2.svg";
          break;
        default:
          return this.state;
      }

      this.setState({
        hiTemp: hiTemp,
        lowTemp: lowTemp,
        imagePath: imagePath
      });
    } catch (error) {
      console.log("there was a frontend error in forecast component ", error);
    }
  }

  componentDidMount() {
    this.getImage();
  }

  render() {
    return (
      <div className="forecast">
        <img
          src={`${this.state.imagePath}`}
          alt="forecastWeatherIcon"
          className="forecast-img"
        />
        <div>Hi:{this.state.hiTemp}</div>
        <div>Lo: {this.state.lowTemp}</div>
      </div>
    );
  }
}

export default Forecast;
