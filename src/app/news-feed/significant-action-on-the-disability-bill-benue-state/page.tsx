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
                Significant Action on the Disability bill, Benue state.
            </h1>
        <Image src="/images/IMG_2477.JPG" alt="women and girls with disabilities group picture" width={990} height={565}
        className="md:max-h-[565px] md:min-w-[990px] object-cover"/>
        </div>
        <div className="flex flex-col space-y-3  md:items-start md:justify-center
        md:ml-0 md:w-[700px] md:px-8 md:shadow-md md:mt-36 md:space-y-6 pb-6 md:pb-10">
        <p className="inline py-1 px-2 w-max bg-neutral-300 
         text-xs rounded-xl font-semibold">ACTION STORY</p>
        <span className="text-sm md:text-base text-blue-950 font-poppins leading-6 md:leading-8">         
        On the 11th of November 2024, The Governor of Benue state Hyacinth Alia made a commitment to 
        the swift passage of the Disability Bill marks a turning point for disability rights in the 
        region. This bill, once passed, will address long-standing challenges faced by persons with disabilities
         (PWDs) in accessing education, employment, and public infrastructure. Advocacy groups such as Inclusive Friends Association
          (IFA) and Disability Rights Advocacy Center (DRAC) have played pivotal roles through persistent lobbying, awareness campaigns, and stakeholder engagement.
        </span>
        <span  className="text-sm md:text-base text-blue-950 font-poppins leading-6 md:leading-8">
        Governor Alia has demonstrated a strong commitment to inclusion by endorsing the bill 
        and initiating its transmission to the State House of Assembly as an executive bill. 
        His administration has also taken practical steps, such as appointing a Special Assistant on 
        Disability Matters and a sign language interpreter, to amplify the voices of PWDs in governance.
        </span>
        <span className="text-sm md:text-base text-blue-950 font-poppins leading-6 md:leading-8">
        The bill’s passage will likely bring transformative benefits, including improved access to 
        education, equitable employment opportunities, and disability-friendly public facilities.
         Advocacy groups are hopeful that it will set a benchmark for other states to emulate, 
         ultimately promoting inclusion and empowering PWDs to participate fully in society.
        </span>
        </div>
        </div>
    )
}