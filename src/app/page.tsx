'use client'
import Image from "next/image";
import Link from "next/link";



export default function Page() {
  return (
    <div className="flex flex-col items-center  mx-0 mt-28 ">
      <div className="w-full md:p-4">
      <div className="min-w-full relative  bg-indigo-500 ">
            <div className="absolute right-0 top-0 h-full w-full bg-gradient-to-t from-indigo-950 to-transparent"></div>
        <Image src='/images/IMG_2468.JPG' alt='cover' width={100} height={100} layout="responsive"
        className="w-full max-h-1/2 md:max-h-[75vh] max-w-full object-cover"/>
        <div  className="absolute md:top-36 md:left-20 backdrop-blur-xs top-12 left-8">
        <h1 className=' font-extrabold md:text-4xl text-lg text-white font-poppins'>
            We are the Sauri Growth Initiative <span className="block">for Women and Youth with Dissabilities.</span> 
            <span className="block">We empower Women and youth with Dissabilities.</span>
        </h1>
        <Link href='/about-us'>
        <button className="md:text-lg text-sm font-extrabold bg-indigo-950 mt-4 p-2 text-white">
          More About Us</button>
        </Link>
        </div>
        
        </div>
      </div>
      <div>
        
      </div>
     <div className="w-full my-3 relative md:px-3 min-h-[600px] md:min-h-[550px] flex-grow">
      <div className="w-full relative">
       <Image src='/images/istockphoto-2166463582-1024x1024.jpg' 
       alt="news feed" width={100} height={100} 
       layout="responsive" className="w-full min-h-64 md:max-h-64 object-cover"/>
       <div className="absolute top-0 right-0 h-full w-full bg-black opacity-35"></div>
       </div>
       <div className="absolute top-6 left-4 md:left-8">
        <h1 className="text-white font-extrabold text-3xl md:text-4xl font-poppins">Latest News</h1>
       </div>
       <Link href='/news-feed/empowering-women-with-disabilities-in-benue-state'>
       <div className="absolute top-20 left-10  md:ml-10 max-w-72 hover:p-4 hover:bg-white
        hover:shadow-xl mb-3">
          <div className="relative">
        <Image src="/images/climateChange.jpeg" alt="news1"height={231} width={288} className="w-72"/>
        <div className=" bg-black px-3 py-2 flex flex-col absolute left-0 bottom-0">
            <time>
              <span className="block text-3xl font-extrabold text-yellow-500">
                  28
              </span> 
              <span className="block text-lg font-bold text-white">
                OCT
              </span>
              <span className="block text-sm text-neutral-200 font-semibold">
                2024
              </span>
            </time>
          </div>
        </div>
          
      
        <div className="mt-4 items-start flex flex-col w-full p-4 space-y-3">
      <p className="p-1 bg-neutral-300 px-2 text-sm rounded-xl">Economic Development</p>
      <p className="text-xl font-extrabold hover:underline hover:decoration-indigo-600 hover:decoration-4 hover:underline-offset-2 cursor-pointer">
        Empowering Women and girls with Disabilities through inlcusive Climate action.</p>
     </div>
       </div>  
       </Link>
       
       <Link href='/news-feed/significant-action-on-the-disability-bill-benue-state'>
       <div className="absolute top-20 left-1/2 transform -translate-x-1/2 mb-3
     hidden lg:block md:mr-10 max-w-72 hover:p-4 hover:bg-white hover:shadow-xl">
      <div className="relative">
      <Image src="/images/IMG_2477.JPG" alt="news1" height={231} width={288} className="w-72"/>
      <div className=" bg-black px-3 py-2 flex flex-col absolute left-0 bottom-0">
          <time>
            <span className="block text-3xl font-extrabold text-yellow-500">
                28
            </span> 
            <span className="block text-lg font-bold text-white">
              OCT
            </span>
            <span className="block text-sm text-neutral-200 font-semibold">
              2024
            </span>
          </time>
        </div>
      </div>
        <div className="mt-4 items-start flex flex-col w-full p-4 space-y-3">
      <p className="p-1 bg-neutral-300 px-2 text-sm rounded-xl">Economic Development</p>
      <p className="text-xl font-extrabold hover:underline hover:decoration-indigo-600 hover:decoration-4
       hover:underline-offset-2 cursor-pointer">Significant Action on the Disability bill, Benue state.</p>
     </div>
       </div>  
       </Link>
    
    <Link href='/news-feed/empowering-women-and-girls-with-disabilities-through-inclusive-climate-action'>
    <div className="absolute top-20 right-0 hidden md:block md:mr-20 
        max-w-72 hover:p-4  hover:bg-white hover:shadow-xl mb-3">
      <div className="relative">
      <Image src="/images/IMG_2479.JPG" alt="news1" height={231} width={288} className="max-h-[231px]"/>
      <div className=" bg-black px-3 py-2 flex flex-col absolute left-0 bottom-0">
          <time>
            <span className="block text-3xl font-extrabold text-yellow-500">
                28
            </span> 
            <span className="block text-lg font-bold text-white">
              NOV
            </span>
            <span className="block text-sm text-neutral-200 font-semibold">
              2024
            </span>
          </time>
        </div>
      </div>
        <div className="my-4 items-start flex flex-col w-full p-4 space-y-3">
      <p className="p-1 bg-neutral-300 px-2 text-sm rounded-xl font-roboto">Economic Development</p>
      <p className="text-xl font-extrabold hover:underline hover:decoration-indigo-600
       hover:decoration-4 hover:underline-offset-2 cursor-pointer text-wrap font-roboto">Empowering Inclusion in Benue State, Nigeria.</p>
     </div>
       </div>
    </Link>
       
       <Link href='/news-feed'>
       <button className="px-3 py-1 bg-blue-900 rounded-3xl text-white font-bold absolute left-1/2 
       transform -translate-x-1/2 bottom-0 md:px-6 md:py-2 hover:scale-105 transition-all ease-in-out"> See More</button>
       </Link>
     </div>
     <div className="md:mb-4 mb-10 w-full md:min-h-[500px] px-8 md:mt-6">
      <div className="bg-slate-100  w-full flex flex-col md:flex-row justify-between items-start
      md:px-36 pt-10 space-x-5 px-4 space-y-3 pb-3">
      <Image src='/images/IMG_3176.JPG' alt="public speaking" width={100} height={100} layout="responsive"
      className="w-full md:min-h-80 max-w-[500px] object-cover"/>
      <div className="flex flex-col justify-between space-y-2 md:space-y-12">
        <h1 className="md:text-5xl font-extrabold text-3xl text-black font-poppins">
          Our Mission & Vision
        </h1>
        <div className="md:bg-white pt-1 px-2 pb-2 md:p-8 w-full flex flex-col 
        items-center justify-center gap-4 shadow-lg">
          <h1 className="text-wrap text-base md:text-lg md:font-bold font-medium md:leading-10 font-poppins">
            A world where women and youth with disabilities can thrive, experiencing equal access
             and opportunities without discrimination or barriers.
          </h1>
          <Link href='/about-us'>
          <button className="bg-blue-900 text-white font-bold md:px-3 md:py-2 py-1 px-2 
          rounded-3xl hover:scale-105 transition-all ease-in-out">
            Learn More
          </button>
          </Link>
        </div>
      </div> 
      </div>
      </div>  
      <div className="flex flex-col md:px-6 w-full">
      <h1 className="  font-bold font-poppins text-3xl md:font-extrabold md:text-5xl md:mb-10 ml-6 mb-5"> Our approach</h1>
      <div className="flex flex-col items-start justify-evenly  w-full  md:flex-row  md:px-0 pb-6 space-y-6 md:space-y-0 md:space-x-3 ">
      <div className="flex-1 flex-col items-center justify-between  px-6 md:space-y-5 space-y-3 md:px-0">
      <Image src='/images/policychange.jpeg' alt=" a physically challenged woman sitting on her wheel chair and holding her voters card" width={300} height={223}
      className="  w-[353px] h-[264px] object-cover"/>
      <h1 className="text-xl font-bold font-poppins">Advocating for Rights and Inclusion.</h1>
     
      <p className="font-poppins break-words"> We champion the rights of women and young persons with
       disabilities by advocating for their full inclusion in all aspects of society.</p>
             <div className="flex items-center justify-center w-full ">
             <Link href='/our-approach/#advocacy'>
             <button className="bg-blue-900 text-white font-bold md:px-6 md:py-2 py-1 px-2 rounded-3xl
             hover:scale-105 transition-all ease-in-out">
            Learn More
          </button>
             </Link>
             </div>
      </div>
      <div className="flex-1 flex-col items-center justify-between  px-6 md:space-y-5 space-y-3 md:px-0">
        
      <Image src='/images/PHOTO-2024-11-12-14-45-03 3.jpg' alt="a man addressing children in the classroom " width={300} height={223}
      className="  object-cover w-[353px] h-[264px] "/>
      <h1 className="text-xl font-bold font-poppins">Promoting Inclusive Education</h1>
       {/* change this p tag */}
      <p className="font-poppins"> We believe education is a fundamental right and a powerful tool for inclusion and empowerment.</p>
             <div className="flex items-center justify-center w-full ">
            <Link href='/our-approach/#education'>
            <button className="bg-blue-900 text-white font-bold md:px-6
              md:py-2 py-1 px-2 rounded-3xl hover:scale-105 transition-all ease-in-out">
            Learn More
          </button>
            </Link>
             </div>
      </div>
      <div className="flex-1 flex-col items-center justify-between  px-6 md:space-y-5 space-y-3 md:px-0">
      <Image src='/images/grouppic.jpeg' alt="our work" width={300} height={223}
      className="object-cover w-[353px] h-[264px]"/>
      <h1 className="text-xl font-bold font-poppins">Driving Inclusive Policy Change</h1>
       {/* change this p tag */}
      <p className="font-poppins"> We actively influence and shape policies to ensure they address 
      the needs of persons with disabilities.</p>
             <div className="flex items-center justify-center w-full ">
            <Link href='/our-approach/#policy'>
            <button className="bg-blue-900 text-white font-bold md:px-6 md:py-2 py-1 px-2 
             rounded-3xl hover:scale-105 transition-all ease-in-out ">
            Learn More
          </button>
            </Link>
             </div>
      </div>
      </div>
      </div>
    </div>
    
  );
}
