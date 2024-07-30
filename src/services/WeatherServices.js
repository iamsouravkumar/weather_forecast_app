import { DateTime } from "luxon";

const API_KEY = "a76195eb818ad9d31be4f6ae6ed8afd7";
// const API_KEY = "04e701a5376d9c7327975c3338ab1be8";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    const res = await fetch(url);
    return await res.json();
}

const iconUrlFromCode = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs + offset, { zone: 'gmt' }).toFormat(format);

const formatCurrent = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        timezone
    } = data;

    const { main: details, icon } = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone)

    return {
        temp, 
        feels_like, 
        temp_min, 
        temp_max, 
        humidity, 
        name, 
        country, 
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'), 
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        details, 
        icon: iconUrlFromCode(icon), 
        speed,
        dt,
        timezone,
        lat,
        lon,
        formattedLocalTime,
    };
}

const formatForecastWeather = (secs, offset, data) =>{
    //hourly
    const hourly = data
    .filter((f)=>f.dt > secs)
    .map((f)=> ({
        date: f.dt_txt,
        temp: f.main.temp,
        icon: iconUrlFromCode(f.weather[0].icon),
        title: formatToLocalTime(f.dt, offset, "hh:mm a")
    }))
    .slice(0,5)

    //daily
    const daily = data
    .filter((f)=>f.dt_txt.slice(-8)==="00:00:00").map(f=>({
        date: f.dt_txt,
        temp: f.main.temp,
        icon: iconUrlFromCode(f.weather[0].icon),
        title: formatToLocalTime(f.dt, offset, "ccc")
    }))

    return {hourly, daily};

}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrent)

const {dt, timezone, lat, lon} = formattedCurrentWeather;

const formattedForecastWeather = await getWeatherData("forecast",{lat, lon, units:searchParams.units}).then((d)=>formatForecastWeather(dt, timezone, d.list))

    return {...formattedCurrentWeather, ...formattedForecastWeather}
}

export default getFormattedWeatherData;