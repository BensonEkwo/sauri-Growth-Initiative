'use client'
import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa6";
import Link from 'next/link';

function Footer() {
  return (
    <div className='flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 md:items-start
    md:gap-4 w-full py-10 md:py-12 px-6  space-y-8 md:space-y-0 
    border-t  decoration-slate-400 '>
        <div className='flex flex-col items-center justify-center space-y-2'>
        <h1 className='text-lg font-poppins font-bold text-blue-950'>Sauri Growth initiative </h1>
        <p className=' font-poppins  text-blue-950 space-y-2'><span className='ml-16'>Office Address Room 002</span>
        <span className='block text-nowrap mx-1'>Oyibo Block,Women centre, Abuja, Nigeria </span>
        <span className='block ml-2'>Tel: +234 9032208922, +234 9064658819</span>
        <span className='block ml-14'>Email: saurigrowth@gmail.com </span></p>
        </div>
        <div className='flex flex-col items-center justify-center space-y-2'>
        <h1 className='text-lg font-poppins font-bold text-blue-950'>
          Join Our Community
        </h1>
        <p className=' font-poppins  text-blue-950 space-y-2'>
        We envision a world where women and young persons with disabilities are empowered,
         included, and treated with dignity. We welcome partnerships and collaborations to drive this vision forward.
        </p>
       </div>
        <div className='flex flex-col items-center justify-center sm:mt-8 md:mt-0 space-y-4'>
          <h1 className='text-blue-950 font-semibold text-lg'>Connect   with us</h1>
       
        <div className='flex items-center  space-x-4 mb-3' >
         <a href='https://www.facebook.com/saurigrowthinitiative?mibextid=LQQJ4d'
         target='_blank' rel='noopener noreferrer' >
         <span className='text-4xl hover:text-blue-950'>
          <FaFacebookSquare/>
          </span>
         </a>
          <a href='https://www.instagram.com/sauri_growth_initiative_?igsh=MXFiaGt2ajkyY2tjdQ=='
         target='_blank' rel='noopener noreferrer' >
          <span className='text-4xl hover:text-pink-700'>
          <BsInstagram/>
          </span>
          </a>

         <a href='https://x.com/saurigrowth/' target='-blank' rel='noopener noreferrer'>
         <span className='text-4xl  hover:text-blue-800'>
          <FaTwitter/>
          </span>
         </a>
        </div>
        </div>
        <div className='flex flex-col items-center space-y-2'>
        <h1 className='text-blue-950 font-semibold text-xl mb-2'>
          Quick links 
        </h1>
        <Link href='/news-feed'>
        <p className='text-blue-950 font-poppins text-sm '> News Feed</p>
        </Link>
        <Link href='/about-us'>
        <p className='text-blue-950 font-poppins text-sm'>About Us</p>
        </Link>
        <Link href='/our-approach'>
        <p className='text-blue-950 font-poppins text-sm'>Our Approach</p>
        </Link>
        </div>
    </div>
  )
}

export default Footer