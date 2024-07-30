import React from 'react'

const TimeAndLocation = ({ weather: {formattedLocalTime, name, country} }) => {
  return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xl font-extralight'>
              {/* Monday, 29 June 2024 | Local Time: 24:00 */}
              {formattedLocalTime}
            </p>
        </div>
        <div className='flex items-center justify-center my-3'>
            <p className='text-3xl font-medium text-white'>{`${name}, ${country}`}</p>
        </div>
    </div>
  )
}

export default TimeAndLocation