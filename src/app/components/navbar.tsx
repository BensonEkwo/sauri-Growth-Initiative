'use client'
import Image from 'next/image'
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidDonateHeart } from "react-icons/bi"
import { IoClose } from "react-icons/io5";
import { UseMyContext } from '../context';
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const Navbar=()=>{
    const {setIsOpen,isOpen}= UseMyContext()
    const handleClick=()=>{
        setIsOpen(!isOpen)
    }
    const [isScrolled,setisScrolled]= useState(false)
   useEffect(()=>{
    const handleScroll=()=>{
        const scrolled=window.scrollY;
        if(scrolled>0){
          setisScrolled(true);
        }
        else{   
          setisScrolled(false)
        }
      }
      window.addEventListener('scroll',handleScroll)
   },[])
   
return(
<nav className={`fixed top-0 z-50 bg-white w-full ${isScrolled ? 'md:h-20 border-b-2 border-gray-600' : 'md:h-28'}`}>
    <div className='flex  md:mx-6 mx-2 md:mb-3  items-center justify-between '>
 <div className=' inline-flex items-center w-1/4 h-1/4'>
    <Image src="/images/img1.png" width={100} height={100} alt='logo' layout='responsive' className={`${isScrolled ? 'md:max-h-24 md:max-w-24':'md:max-h-32 md:max-w-32' }`}/>
    <span>
        <h2> <span className={`block font-bold text-sm ${isScrolled ? 'md:text-lg' : 'md:text-2xl'}`}>SAURI </span>
            <span className={`block font-semibold text-xs  ${isScrolled ? 'md:text-xs' : 'md:text-sm'}`}>Growth Initiative</span></h2></span>
    </div>
    <ol className="hidden md:flex flex-row space-x-8">
        <Link href='/'>
        <li className={`font-bold text-xl hover:border-b-4 hover:scale-105 transition-all duration-150 border-blue-950 ${isScrolled ? 'md:text-lg' : 'md:text-xl'}`}>
            HOME
        </li>
        </Link>

        <Link href='/news-feed'>
        <li className={`font-bold text-xl hover:border-b-4 hover:scale-105 transition-all duration-150 border-blue-950 ${isScrolled ? 'md:text-lg' : 'md:text-xl'}`}>
            NEWS FEED
        </li>
        </Link>
        
        <Link href='/about-us'>
        <li className={`font-bold text-xl hover:border-b-4 hover:scale-105 transition-all duration-150 border-blue-950 ${isScrolled ? 'md:text-lg' : 'md:text-xl'}`}>
            ABOUT US
        </li>
        </Link>
        
        <Link href='/our-approach'>
        <li className={`font-bold text-xl hover:border-b-4 hover:scale-105 transition-all duration-150 border-blue-950 ${isScrolled ? 'md:text-lg' : 'md:text-xl'}`}>
            OUR APPROACH
        </li>
        </Link>
        
    </ol>
    <div>
        <Link href='/donate'>
        <button className='group rounded-3xl px-4 md:px-10 py-2 bg-black font-extrabold text-white ml-16
        inline-flex gap-2'>
            DONATE 
            <span className='text-lg group-hover:scale-105 transition-all ease-in-out group-hover:text-2xl'>
            <BiSolidDonateHeart />
            </span>
        </button>
        </Link>
        
    </div>
    {isOpen ? 
    <div className='text-3xl font-extrabold md:hidden cursor-pointer mx-2' onClick={handleClick} ><IoClose /></div> :<div onClick={handleClick} className='text-3xl font-extrabold md:hidden cursor-pointer mx-2'><GiHamburgerMenu/></div>}
    </div>
     <Sidebar/>
</nav>
)
}