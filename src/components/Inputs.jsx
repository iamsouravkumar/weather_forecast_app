import { BiSearch, BiCurrentLocation } from "react-icons/bi"
import { useState } from "react"

const Inputs = ({ setQuery, setUnits }) => {

  const [city, setCity] = useState(" ")

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city })
      setCity("");
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setQuery({ lat: latitude, lon: longitude })
      })
    }
  }
  return (
    <div className=" input flex flex-row justify-center my-8">
      <div className="input-2 flex flex-row w-3/4 items-center justify-content space-x-4">
        <input
          className="px-2 py-2 text-xs w-full shadow-gray-500 shadow-md rounded-md bg text-black capitalize focus:outline-none placeholder:lowercase " type="text" placeholder="Search by City ex. Delhi, Mumbai, etc."
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchClick();
              setCity("");
            }
          }} />
        <BiSearch size={30} className="cursor-pointer hover:scale-125 transition ease out text-white" onClick={handleSearchClick} />
        <BiCurrentLocation size={30} className="cursor-pointer hover:scale-125 transition ease out text-white" onClick={handleLocationClick} />
      </div>
      {/* <div className=" convert flex flex-row w-1/4 items-center justify-center">
        <button className="text-2xl font-medium transition ease-out hover:scale-125 text-white" onClick={() => setUnits("metric")}>&deg;C</button>
        <p className="text-2xl font-medium mx-1 text-white">|</p>
        <button className="text-2xl font-medium transition ease-out hover:scale-125 text-white" onClick={() => setUnits("imperial")}>&deg;F</button>
      </div> */}
    </div>
  )
}

export default Inputs