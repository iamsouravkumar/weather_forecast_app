import React, { useState, useEffect } from 'react'
// import TopButtons from './components/TopButtons'
import Navbar from './components/Navbar'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TempAndDetails from './components/TempAndDetails'
import Forecast from './components/Forecast'
import getFormattedWeatherData from './services/WeatherServices'
import { ToastContainer, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {

  const [query, setQuery] = useState({ q: "ghaziabad" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getWeather = async () => {
    const city = query.q ? query.q : "current location";

    toast.promise(
      getFormattedWeatherData({ ...query, units }),
      {
        pending: `Fetching weather data for ${capitalize(city)}`,
        success: (data) => {
          document.title = `Weather - ${data.name}, ${data.country}`
          setWeather(data);
          return `Fetched weather data for ${data.name}, ${data.country}`
        },
        error: 'Error fetching weather data!',
      }
    );
    //toast.info(`Fetching weather data for ${capitalize(city)}`)
    document.title = `Fetching - ${capitalize(city)}`
    await getFormattedWeatherData({ ...query, units }).then((data) => {
      //toast.success(`Fetched weather data for ${data.name}, ${data.country}`)
      document.title = `Weather - ${data.name}, ${data.country}`
      setWeather(data);
    })
    // console.log(data);
  }

  useEffect(() => {
    getWeather();
  }, [query, units])

  const formatBackground = () => {
    if (!weather) return "from-cyan-500 to-blue-600";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-yellow-500 to-orange-600";
    return "from-cyan-500 to-blue-600";
  };

  return (
    <div className={`app mx-auto max-w-screen-xl mt-6 mb-6 py-4 rounded-md shadow-gray-400 shadow-xl bg-gradient-to-r ${formatBackground()}`}>
      {/* <TopButtons setQuery={setQuery} /> */}
      <Navbar setUnits={setUnits}/>
      <Inputs setQuery={setQuery} setUnits={setUnits} />
      {
        weather &&
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <Forecast title="3 hour step forecast" data={weather.hourly} />
          <Forecast title="daily forecast" data={weather.daily} />
        </>
      }
      <ToastContainer transition={Slide} autoClose={1500} theme="colored" newestOnTop={true} hideProgressBar={true} />
    </div>
  )
}
export default App