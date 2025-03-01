"use client"

import React from 'react'

const Footer = () => {

  const [year, setYear] = React.useState(new Date().getFullYear());

  return (
    <div className='flex justify-center border-gray-300 border-t-2 transition duration-300'>
      <div className='w-full flex max-md:flex-wrap max-md:gap-2 px-2 py-2 justify-around items-center dark:text-slate-400 text-black fill-black dark:fill-slate-400 transition duration-300'>
        <div className='w-5/12 flex flex-col justify-between items-start max-md:w-full'>
          <div className='w-full flex justify-center gap-4 items-center p-2'>
            {/* {socialMedia.map((item, index) => (
              <a href={item.link} target='_blank' className='w-6 h-6' key={index} aria-label={item.value}>
                {item.image}
              </a>
            ))} */}
          </div>
          <div className='text-center text-sm w-full px-2'>Copyright ® {year} Plato</div>
        </div>

        {/* <div className='h-4/6 w-[1px] bg-gray dark:bg-white transition duration-300 max-md:hidden' />
        <div className='h-[1px] w-5/6 bg-gray dark:bg-white transition duration-300 md:hidden' /> */}


      </div>
    </div>
  )
}

export default Footer