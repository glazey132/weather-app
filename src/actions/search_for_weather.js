export const searchForWeather = (cityChoice) => {
		console.log("searching for this city's weather: ", cityChoice);
				return {
						type: 'WEATHER_SEARCH',
						cityChoice
					}
}
