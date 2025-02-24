import React from 'react'

const LeftPanelNavigation = (props: {
  navContents?: {
    name: string;
    link: string;
  }[],
  currentPath?: string,
  onChange: (isOpenMenu: boolean) => void,
  isOpenMenu?: boolean
  ref ?: any
}) => {

  const [currentPath, setCurrentPath] = React.useState(props.currentPath);

  return (
    <>
      <div
        className={`absolute h-full w-full z-20 bg-black transition-all duration-300 ${props.isOpenMenu ? 'opacity-50 pointer-events-none' : 'opacity-0 pointer-events-none'
          }`}
      >

      </div>
      <div className={`absolute h-full duration-300 z-30 bg-white dark:bg-black-2 text-black dark:text-white transition-all overflow-hidden  ${props.isOpenMenu ? 'w-5/6' : 'w-0'} shadow-2xl`} ref={props.ref}>
        <div className='flex flex-col gap-4 text-2xl font-bold justify-center items-center w-full h-full'>
          {props.navContents?.map((item, index) => (
            <a href={item.link} key={index} className={`hover:underline underline-offset-4 ${currentPath === item.link ? 'underline' : ''}`} onClick={() => {
              setCurrentPath(item.link);
              props.onChange(false);
            }
            }>
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default LeftPanelNavigation