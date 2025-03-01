"use client"

import React, { useEffect } from 'react'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LeftPanelNavigation from "@/components/LeftPanelNavigation";
import NavigationContent from "@/interfaces/NavigationContent";
import Image from "next/image";


const navContents: NavigationContent[] = [
  {
    name: "Home",
    link: "#"
  },
  {
    name: "About",
    link: "/about"
  },
  {
    name: "Discover",
    link: "/discover"
  },
  {
    name: "Profile",
    link: "/profile"
  }
]


const Home = () => {

  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [item, setItem] = React.useState("");
  const leftPanelRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    setItem(navContents.find(nav => location.hash.includes(nav.link ?? ''))?.link ?? navContents[0]?.link ?? '');
  }, []);

  useEffect(() => {
    // event listener for closing the left panel
    const handleClick = (e: MouseEvent) => {
      if (isOpenMenu && leftPanelRef.current && !leftPanelRef.current.contains(e.target as Node)) {
        setIsOpenMenu(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }

  }, [isOpenMenu]);

  return (
    <>
      <LeftPanelNavigation navContents={navContents} currentPath={item} onChange={setIsOpenMenu} isOpenMenu={isOpenMenu} ref={leftPanelRef} />
      <div className='relative flex flex-col justify-between w-screen h-screen '>

        <Header navContents={navContents} currentPath={item} onChange={setIsOpenMenu} isOpenMenu={isOpenMenu} />
          <div className='w-full h-full overflow-hidden flex justify-center items-center relative'>
            <Image src='/assets/background.jpg' width={1920} height={1080} className='w-full h-full absolute object-cover -z-10'  alt='background' />
              <p className='title text-white'>
                Lorem ipsum
              </p>
          </div>

      </div>
          <Footer />
    </>
  )
}

export default Home