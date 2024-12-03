import Image from "next/image"
import Link from "next/link"
export default function page(){
    return(
        <div className="flex flex-col items-center  mx-0 mt-16 px-6  ">
           <div style={{backgroundImage:'url(/images/IMG_2486.JPG)'}}
           className="w-full md:h-[490px] h-[200px] bg-center bg-cover bg-no-repeat relative flex items-center justify-center
           md:mb-32 mb-16">
            <div className="absolute right-0 top-0 bottom-0 left-0 bg-blue-950 opacity-75 ">
            </div>
            <h1 className="md:text-6xl text-3xl text-white font-extrabold z-30 font-poppins
            relative inline-block  after:border-b-8  after:border-blue-600 after:block pb-6 md:pb-10
            after:w-20 after:absolute after:bottom-0 after:right-1/2 after:transform after:translate-x-1/2 "> Our Latest News</h1>
           </div>
           <div className="flex flex-col space-y-3 items-center py-4 md:flex-row md:justify-between md:mx-6 md:px-20 md:space-x-8
           shadow-lg md:py-3 md:my-8 my-6">
           <Image src='/images/climateChange.jpeg' alt="women and girls with disabilities group photo" width={321} height={227}
           className="md:w-[430px] md:h-[304px] object-cover"/>
            <div className="flex flex-col space-y-3 md:space-y-6 px-3">
                <p className="inline py-1 px-2 w-max bg-neutral-300  text-xs rounded-xl font-semibold">ECONOMIC DEVELOPMENT</p>
            <h1 className="font-poppins font-bold md:text-3xl text-xl">Empowering Women With Disabilities in Benue State.</h1>
            <Link href='/news-feed/empowering-women-with-disabilities-in-benue-state'>
            <button className="bg-blue-800 text-white
            inline-block w-max text-lg font-semibold py-1 px-4 rounded-2xl
          ">Read Story </button>
            </Link>
            </div>
           </div>
           <div className="flex flex-col space-y-3 items-center py-4 md:flex-row md:justify-between md:mx-6 md:px-20 md:space-x-8
           shadow-lg md:py-3 md:my-8 my-6">
           <Image src='/images/IMG_2479.JPG' alt="four resilienet strategies on climate change 
           for women and girls with Disabilities" width={321} height={227}
           className="md:min-w-[377px] md:h-[304px] max-h-[258px] "/>
            <div className="flex flex-col space-y-3 md:space-y-6 px-3">
                <p className="inline py-1 px-2 w-max bg-neutral-300  text-xs rounded-xl font-semibold">ECONOMIC DEVELOPMENT</p>
            <h1 className="font-poppins font-bold md:text-3xl text-xl">Empowering Women and girls with disabilities through inclusive climate action.</h1>
           <Link href='/news-feed/empowering-women-and-girls-with-disabilities-through-inclusive-climate-action'>
           <button className="bg-blue-800 text-white
            inline-block w-max text-lg font-semibold py-1 px-4 rounded-2xl">Read Story </button>
           </Link>
            </div>
           </div>
           <div className="flex flex-col space-y-3 items-center py-4 md:flex-row md:justify-between md:mx-6 md:px-20 md:space-x-8
           shadow-lg md:py-3 md:my-8 my-6">
           <Image src='/images/IMG_2477.JPG' alt="four resilienet strategies on climate change 
           for women and girls with Disabilities" width={321} height={227}
           className="md:min-w-[377px] md:h-[304px] max-h-[258px] "/>
            <div className="flex flex-col space-y-3 md:space-y-6 px-3">
                <p className="inline py-1 px-2 w-max bg-neutral-300  text-xs rounded-xl font-semibold">Action Story</p>
            <h1 className="font-poppins font-bold md:text-3xl text-xl">Significant Action on the Disability bill,Benue state.</h1>
           <Link href='/news-feed/significant-action-on-the-disability-bill-benue-state'>
           <button className="bg-blue-800 text-white
            inline-block w-max text-lg font-semibold py-1 px-4 rounded-2xl">Read Story </button>
           </Link>
            </div>
           </div>
        </div>
    )
}