import React from 'react'

const TimeAndLocation = ({ weather: {formattedLocalTime, name, country} }) => {
  return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className=' p-info text-white text-xl font-extralight text-center'>
              {/* Monday, 29 June 2024 | Local Time: 24:00 */}
              {formattedLocalTime}
            </p>
        </div>
        <div className='flex items-center justify-center my-3'>
            <p className='p-name text-3xl font-medium text-white'>{`${name}, ${country}`}</p>
        </div>
    </div>
  )
}

export default TimeAndLocation