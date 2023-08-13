import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [data , setData] = useState({})
  const[location,setLocation] = useState('')
  const [loading, setLoading] = useState(false);

  const Url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c73b70b03da61f4d9521f6d58c5d24ba`


  function search(event) {
    if(event.key === 'Enter'){
      fetchData()
  }}

  const fetchData = () =>{
    setLoading(true)
    

    axios.get(Url).then((res) => {
      setData(res.data)
      setLoading(false)
    })
    setLocation('')
  }

  useEffect(() =>{
    fetchData()
  }, [])


  return (
    <div className="App">
      <div className="search">
        <input type="text" 
      value={location}
       onChange={(event) => setLocation(event.target.value)}
        placeholder="Enter location"
        onKeyPress={search}
          />
          </div>
      
      {loading ? <div class="center">
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
</div> : <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main && <h1>{Math.round(data.main.temp - 273.15)}°C</h1>}
          </div>
          <div className="description">
            {data.weather && <p>{data.weather[0].description}</p>}
          </div>
        </div>

        {data.name != undefined && (
        <div className="bottom">
          <div className="feels">
            {data.main && <p>{Math.round(data.main.feels_like - 273.15)}°C</p>}
            <p className="bold">Feels like</p>
          </div>
          <div className="humidity">
            {data.main && <p>{data.main.humidity}%</p>}
            <p className="bold">Humidity</p>
          </div>
          <div className="wind">
            {data.wind && <p>{data.wind.speed}km/h</p>}
            <p className="bold">Wind Speed</p>
            </div>
        </div>) }
      </div>}
      
    </div>
         
  );
}


