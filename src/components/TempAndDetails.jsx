import { FaThermometerEmpty } from "react-icons/fa"
import { BiSolidDropletHalf } from "react-icons/bi"
import { FiWind } from "react-icons/fi"
import { GiSunrise, GiSunset } from "react-icons/gi"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"

const TempAndDetails = ({ weather: {
  details,
  icon,
  temp,
  temp_min,
  temp_max,
  humidity,
  speed,
  sunrise,
  sunset,
  feels_like,
},
  units,
}) => {
  const VerticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}\u00B0C`
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind Speed",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/h"}`
    },
  ]

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunsrise",
      value: sunrise
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}\u00B0C`
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}\u00B0C`
    }
  ]
//   const textColor = (temp) => {
//     if (temp >= 35) return "red-300";
//     else if (temp >= 26) return "orange-300";
//     else if (temp <= 16) return "cyan-300";
//     else return "blue-300";
// }

  return (
    <div >
      <div className={`flex items-center justify-center py-6 text-2xl text-cyan-300`}>
        <p>{details}</p>
      </div>
      <div className="flex flex-row items-center justify-between py-3">
        <img src={icon}
          alt="weather icon"
          className="w-20" />

        <p className="text-5xl text-white">{`${temp.toFixed()}\u00B0`}</p>
        <div className="flex flex-col space-y-3 items-start text-white">
          {VerticalDetails.map(({ id, Icon, title, value }) => (

            <div key={id} className="flex font-light text-sm items-center justify-center">
              <Icon size={18} className="mr-1" />
              {`${title}:`} <span className="font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex flex-row items-center text-white">
            <Icon size={30} />
            <p className="font-light ml-1">
              {`${title}:`} <span className="font-medium ml-1">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TempAndDetails