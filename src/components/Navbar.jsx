import React from 'react'

const Navbar = ({setUnits}) => {
    return (
        <div>
            <nav className='flex justify-between items-center p-2 bg-white bg-opacity-0 rounded-md shadow-md'>
                <img className='h-20 hover:scale-125 transition ease-out cursor-pointer drop-shadow-md' src="./images/logo.png" alt="weather logo" />
                <div className='text-2xl font-medium text-center'><p className='heading'>Weather Forecast App</p></div>
            <div className="converter flex items-center mr-2">
                <button className="text-2xl font-medium transition ease-out hover:scale-125 text-white" onClick={() => setUnits("metric")}>°C</button>
                <p className="text-2xl font-medium mx-1 text-white">|</p>
                <button className="text-2xl font-medium transition ease-out hover:scale-125 text-white" onClick={() => setUnits("imperial")}>°F</button>
            </div>
            </nav>
        </div>
    )
}

export default Navbar