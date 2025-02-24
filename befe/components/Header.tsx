"use client"

import React from 'react';
import { useState, useEffect } from 'react';
import ThemeButton from './ThemeButton';
import MenuBar from './MenuBar';
import Link from 'next/link';
// import ThemeButton from './ThemeButton';
// import MenuBar from './MenuBar';


interface HeaderProps {
  navContents?: {
    name: string;
    link: string;
  }[];
  currentPath?: string;
  isOpenMenu?: boolean;
  onChange?: (isOpenMenu: boolean) => void;
}

const Header = (props: HeaderProps) => {

  const [currentPath, setCurrentPath] = useState(props.currentPath);

  return (
    <nav className='flex justify-center bg-white-1 bg-opacity-50 dark:bg-black-1 dark:bg-opacity-50 hover:bg-opacity-90 backdrop-blur-sm text-black dark:text-white transition duration-300 box-shadow-custom'>
      <div className='w-full flex px-4 py-2 justify-between items-center text-2xl font-bold '>
        <Link href='/'>
          <div className='flex gap-4'>
            
            <div className='flex justify-center items-center text-nowrap'>
              Plato
            </div>
          </div>
        </Link>
        <div className='flex justify-end items-center w-full max-md:hidden gap-5 px-5'>
          {props.navContents?.map((item, index) => (
            <a href={item.link} key={index} className={`hover:underline underline-offset-4 ${currentPath === item.link ? 'underline' : ''}`} onClick={() => setCurrentPath(item.link)}>
              {item.name}
              </a>
          ))}

        </div>
        <div className='flex justify-between gap-4'>
          <ThemeButton />
          <div className="md:hidden">
            <MenuBar checked={props.isOpenMenu} onChange={props.onChange}/>

          </div>
        </div>

      </div>
    </nav>
  )
}

export default Header