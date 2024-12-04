import Image from "next/image"
import Link from "next/link"
import { IoArrowBack } from "react-icons/io5";
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
                Empowering Women and Girls with diabilities through inclusive Climate action 
            </h1>
        <Image src="/images/IMG_2479.JPG" alt="four resilient strategies on climate change for 
        women and girls with disabilities" width={990} height={565}
        className="md:max-h-[565px] md:min-w-[990px]"/>
        </div>
        <div className="flex flex-col space-y-5  md:items-start md:justify-center
        md:ml-0 md:w-[800px] md:px-8 md:shadow-md md:mt-36 md:space-y-8 px-4">
        <p className="inline py-1 px-2 w-max bg-neutral-300 
         text-xs rounded-xl font-semibold">ECONOMIC DEVELOPMENT</p>
     <div className="md:grid md:grid-cols-2 md:gap-3 space-y-6 md:space-y-0">
     <div className="">
        <Image src='/images/climatechangecartoon2.jpeg'alt="the first one is, accessible early warning systems:
        Develop and implement early warning systems that are accessible to women
        and girls with disabilities.
        this includes using multiple formats such as visual,audio,
        and text alerts to ensure everyone can receive timely information about impending climate disasters." width={467} height={369}/>
      </div>
      <div>
        <Image src='/images/climateChangecartoon3.jpeg' alt="2. CLIMATE-RESILIENT LIVELIHOODS:
         PROVIDE TRAINING AND RESOURCES FOR WOMEN AND GIRLS 
        WITH DISABILITIES TO ENGAGE IN CLIMATE-RESILIENT LIVELIHOODS. SUCH AS 
        ADAPTIVE FARMING TECHNIQUES, ECO-FRIENDLY BUSINESSES, AND SUSTAINABLE CRAFTS." width={467} height={369}/>
      </div>
     </div>
     <div className="md:grid md:grid-cols-2 md:gap-3 space-y-6 md:space-y-0">
     <div>
        <Image src='/images/climateChangecartoon4.jpeg' alt="3. INCLUSIVE DISASTER RISK REDUCTION (DRR) PROGRAMS:
ENSURE THAT WOMEN AND GIRLS WITH DISABILITIES ARE INCLUDED IN DISASTER RISK REDUCTION PLANNING AND RESPONSE EFFORTS. 
THIS CAN INVOLVE COMMUNITY-BASED TRAINING PROGRAMS ON DISASTER PREPAREDNESS. EVACUATION PLANS.
AND ACCESSIBLE SHELTERS." width={467} height={369}/>
      </div>
      <div>
        <Image src='/images/climatechangecartoon5.jpeg' alt="4. MENTAL HEALTH AND PSYCHOSOCIAL SUPPORT:
ESTABLISH MENTAL HEALTH SERVICES THAT PROVIDE TARGETED SUPPORT FOR WOMEN AND GIRLS WITH DISABILITIES AFFECTED BY CLIMATE CHANGE. 
THIS HELPS THEM COPE WITH TRAUMA.
STRESS. AND DISPLACEMENT CAUSED BY CLIMATE DISASTERS." width={467} height={369}/>
      </div>
     </div>
     <div className="flex flex-col space-y-3">
            <span className="text-lg font-semibold">Watch video</span>
            <video controls width={640} height={360}>
            <source src='/videos/climatechange.mp4' type="video/mp4"/>
            your browser does not support the video
            </video>
        </div>
        <h1 className="text-lg font-poppins font-bold ">Empowering Women and Girls with Disabilities: 
        A Climate Change Booklet</h1>
      <span className="text-base md:text-base text-blue-950 font-poppins leading-6 md:leading-8">         
       This accessible booklet is specifically design for women and girls with disabilities,
       providing essential information on climate change and it intersection with gender,
        available here: <span>
            <a href='/docs/SGIWYD MATERIAL.pdf'
         target="_blank"   rel="noopener noreferrer" className="font-roboto font-semibold hover:underline hover:underline-offset-2"> Download booklet</a>
        </span>
        </span>
        <span className="text-base md:text-base text-blue-950 font-poppins leading-6 md:leading-8">
        The booklet explore the unique challenges and opportunities faced by women and girls with disabilities in
        the context of climate change, and offers practical tips and strategies for building resilience and promoting 
        inclusive climate action.
        </span>
        
      <h1 className="text-lg font-poppins font-bold ">Policy Brief: Inclusive Climate Change policies</h1>
      <span className="text-base md:text-base text-blue-950 font-poppins leading-6 md:leading-8">         
        We're pleased to share the policy brief developed during the stakeholders dialogue meeting between women and girls with disabilities, 
        available here: <span>
            <a href='/docs/Policy Brief Inclusive Climate Change Policy for Women and Girls with Disabilities in Benue State-1.docx'
         target="_blank"   rel="noopener noreferrer" className="font-roboto font-semibold hover:underline hover:underline-offset-2"> Download Policy brief</a>
        </span>
        </span>
        <span className="text-base md:text-base text-blue-950 font-poppins leading-6 md:leading-8">
       This accessible resources provides an in-depth look at the intersection of climate change, disability, and gender.
       Using Benue state as a case study, this brief highlights the unique challenges faced by women and girls with disabilities in
       the context of climate change, and offers recommendations for inclusive policy solutions. 
        </span>
        <span className="text-base md:text-base text-blue-950 font-poppins leading-6 md:leading-8">
            Special thanks to News 24 International for publishing this important resource,
            made possible with support from Urgent Action Fund-Africa. 
        </span>
        <span className="text-base md:text-base text-blue-950 font-poppins leading-6 md:leading-8">
            Read the brief to learn more about creating a climate-resilient
            future that leaves no one behind.
        </span>
        </div>
        </div>
    )
}