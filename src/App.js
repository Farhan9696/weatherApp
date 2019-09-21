import React from 'react';

import './App.css';

import 'weather-icons/css/weather-icons.css';
import 'weather-icons/css/weather-icons-wind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './components/weather.component'
import { async } from 'q';
import Form from './components/form.component';

const API_key="9624c9af87f645e8d05503cb11262d44"

class App extends React.Component {
  constructor(){
    super();
    this.state={
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false      
    };
 

    this.weathericon={
      Cloudy: "wi-day-cloudy",
      Rain: "wi-storm-showers",
      Thunderstrom: "wi-thunderstrom",
      Drizzle: "wi-sleet",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-cloudy"
    }
  }

  calCelsius(temp){
    let cal= Math.floor(temp-273.15);
    return cal;
  }

  get_WeatherIcons(icons,rangeId){
    switch(true){
      case rangeId >=200 && rangeId <=232:
        this.setState({icon:this.weathericon.Thunderstrom})
        break;
        case rangeId >=300 && rangeId <=321:
        this.setState({icon:this.weathericon.Drizzle})
        break;
        case rangeId >=500 && rangeId <=531:
        this.setState({icon:this.weathericon.Rain})
        break;
        case rangeId >=600 && rangeId <=622:
        this.setState({icon:this.weathericon.Snow})
        break;
        case rangeId >=701 && rangeId <=781:
        this.setState({icon:this.weathericon.Atmosphere})
        break;
        case rangeId ===800:
        this.setState({icon:this.weathericon.Clear})
        break;
        case rangeId >=801 && rangeId <=804:
        this.setState({icon:this.weathericon.Clouds})
        break;
        default:
          this.setState({icon:this.weathericon.Clouds})

    }
  }

  getWeather = async(e) =>{
    
    e.preventDefault();

    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;

    if(city && country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
    
      const response = await api_call.json();
      
      console.log(response);
  
      this.setState({
        city: `${response.name},${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        humidity: response.main.humidity
      })
  
      this.get_WeatherIcons(this.weathericon,response.weather[0].id);
      
    }
    else{
      this.setState({error: true});
    }
   
  };

  render() { 
    return (  
      <div className="App">
      <Form loadweather={this.getWeather} error={this.state.error}/>
    <Weather city={this.state.city} country={this.state.country} temp_celsius={this.state.celsius}
      temp_max={this.state.temp_max} temp_min={this.state.temp_min} description={this.state.description} humidity={this.state.humidity}
      weathericon={this.state.icon}
    />
    </div>
    );
  }
}
 





export default App;
