import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'

const Find = ({func}) => {
  return (
    <>
      <p>find countries</p>
      <input onChange={func}/>
    </>
  )
}

const Filter = ({countries,countryName}) => {
  if(countryName === '') return null;

  const result = countries.filter(country => {
    if(country.name.includes(countryName) || country.name.toLowerCase().includes(countryName)){
      return country;
    }
    return null;
  })

  // const handleClick = event => {
  //   event.preventDefault()
  //   console.log(event.target.value)
  // };
  
  if(result.length > 10) 
    return <p>Too many matches, specify another filter</p>
  else if(result.length > 1)
    return result.map(country => {return <Button country={country} /> }) 
  else if(result.length === 1)
    return <Country country={result[0]}/>  
  return null;  
}

const Button = ({country}) => {
  const [showInfo,setShowInfo] = useState('');
  
  return(
    <div>
      <span>{country.name}</span> 
      <button onClick={() => { setShowInfo(country) }}>show</button>
      <Country country={showInfo} />
    </div>
  )
}

const Country = ({country}) => { 
  const [weatherData, setWeatherData] = useState(null); 
  
        console.log(process.env.REACT_APP_API_KEY);
        console.log(country.capital);
  
  useEffect( () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then( response => {
        console.log(response.data);
        setWeatherData(response.data);
      })
  }, [country]) //}

  if(country === '') return null;
  if(weatherData !== null)
    return( 
      <div>
        <h2>{country.name}</h2>
        <p>capital : {country.capital}</p>
        <p>population : {country.population}</p>
        <h3>Languages</h3>
        <ul>{country.languages.map(lang => {return <li>{lang.name}</li>})}</ul>
        <img src={country.flag} alt='flag' width='100px' height='100px'></img>
        <h3>Weather in {country.capital}</h3>
        <p>temperature : {weatherData.current.temperature} Celcius</p>
        <img src={weatherData.current.weather_icons} alt='icon' ></img>
        <p>wind : {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</p>
      </div>
    )
  else return null;  
}

const App = () =>{
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState('');

  const handleSearchInput = event => setCountryName(event.target.value);

  useEffect( () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( response => {
        setCountries(response.data);
      })
  }, [])    


  return(
    <div>
      <Find func={handleSearchInput} />
      <Filter countries={countries} countryName={countryName}/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

