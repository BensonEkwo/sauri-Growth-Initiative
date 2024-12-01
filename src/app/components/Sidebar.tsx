'use client'
import { UseMyContext } from "../context"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import Link from 'next/link'
export const Sidebar=()=>{
    const {isOpen,setIsOpen} = UseMyContext()
    const handleClick=()=>{
        setIsOpen(!isOpen)
    }
    return(
        <div className={`w-screen h-screen z-50 flex items-start justify-start fixed top-0 bg-white transition-transform duration-3000 ease-in-out ${isOpen? 'translate-x-0':' -translate-x-full'}`}>
            {isOpen && 
    <div className='text-5xl font-extrabold md:hidden cursor-pointer mx-2 fixed top-4 right-2' onClick={handleClick} ><IoClose /></div>}
    
            <ol className="flex flex-col items-center mt-20 space-y-7 ml-8 font-extrabold text-xl " onClick={handleClick}>
                <Link href='/'>
                <li>
                HOME
                </li>
                </Link>
                <Link href='news-feed'>
                <li>
                 NEWS FEED
                </li>
                </Link>
               <Link href='our-approach'>
               <li>
                OUR APPROACH
                </li>
               </Link>
               <Link href='/about-us'>
               <li>
                 ABOUT US
                </li>
               </Link>
            </ol>
        </div>
    )
}