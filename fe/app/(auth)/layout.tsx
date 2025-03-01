import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex items-center justify-center h-screen bg-pink-50 text-gray-900">
      <div className='w-96 flex flex-col p-10 bg-white h-full'>
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Image src="/zen_logo.svg" alt="Zenwork Logo" width={50} height={50} />
          Zenwork
        </Link>
      </div>
      <div className='w-full flex flex-col items-center justify-center'>
        {children}
      </div>
      
    </div>
  )
}

export default Layout