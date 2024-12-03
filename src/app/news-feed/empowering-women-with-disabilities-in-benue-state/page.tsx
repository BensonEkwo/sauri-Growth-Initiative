import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
export default function page(){
    return(
        <div className="flex flex-col items-start px-4 mt-24 md:mt-36 w-full space-y-6 mb-16 md:space-y-10
        md:px-10">
        <div className="inline-flex ">
            <Link href="/news-feed" className="inline-flex items-center space-x-2">
            <span className="text-xl md:text-2xl"><IoArrowBack /></span><span className="inline text-sm md:text-base">News Feed</span>
            </Link>
        </div>
        <div className="flex flex-col space-y-8 md:space-y-12 ">
            <h1 className="text-3xl font-poppins font-bold md:text-6xl md:font-extrabold md:leading-relaxed">
                Empowering Women  with Disabilities in Benue State.
            </h1>
        <Image src="/images/climateChange.jpeg" alt="women and girls with disabilities group picture" width={990} height={565}
        className="md:max-h-[565px] md:min-w-[990px] object-cover"/>
        </div>
        <div className="flex flex-col space-y-3  md:items-start md:justify-center
        md:ml-0 md:w-[700px] md:px-8 md:shadow-md md:mt-36 md:space-y-6 pb-6 md:pb-10">
        <p className="inline py-1 px-2 w-max bg-neutral-300 
         text-xs rounded-xl font-semibold">ECONOMIC DEVELOPMENT</p>
        <span className="text-sm md:text-base text-blue-950 font-poppins leading-6 md:leading-8">         
    We're thrilled to share the success of our 2-day training on climate change and 
    resilience strategies for 30 women with disabilities in Otukpo, Benue State!  
        </span>
        <span  className="text-sm md:text-base text-blue-950 font-poppins leading-6 md:leading-8">
        we kicked off the training with a startling realization - 70% of 
        our participants had little to no knowledge about climate change and its impact 
        on their lives. 
        </span>
        <span className="text-sm md:text-base text-blue-950 font-poppins leading-6 md:leading-8">
        But after an engaging and informative session, 
        we witnessed a remarkable transformation! The women demonstrated a
         clear understanding of climate change and its effects on women with different disabilities 
         through their group work presentations.
        </span>
        <span className="w-full ">
        <Image src="/images/roundtable.jpeg" alt="women sitting in groups on a round table discussion" width={467} height={311} />
        <span className="text-xs"> women at a round table group discussion </span>
        </span>
        <span className="text-sm md:text-base text-blue-950 font-poppins font-semibold leading-6 md:leading-8">
        We're proud to have created a safe space for these incredible
         women to learn, share, and grow.
        </span>
        <div className="flex flex-col space-y-3">
            <span className="text-lg font-semibold">Watch video</span>
            <video controls width={640} height={360}>
            <source src='/videos/urgentactionvideo.mp4' type="video/mp4"/>
            your browser does not support the video
            </video>
        </div>
        </div>
        </div>
    )
}