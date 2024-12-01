import { url } from "inspector";
import Image from "next/image";

export default function page(){
    return(
        <div className="flex flex-col items-center  mx-0 mt-16 px-6 ">
           <div style={{backgroundImage:'url(/images/PHOTO-2024-11-12-14-45-03.jpg)'}}
           className="w-full md:h-[490px] h-[200px] bg-center bg-cover bg-no-repeat relative flex items-center justify-center
           md:mb-32 mb-16">
            <div className="absolute right-0 top-0 bottom-0 left-0 bg-blue-950 opacity-75 ">
            </div>
            <h1 className="md:text-6xl text-3xl text-white font-extrabold z-30 font-poppins
            relative inline-block  after:border-b-8  after:border-blue-600 after:block pb-6 md:pb-10
            after:w-20 after:absolute after:bottom-0 after:right-1/2 after:transform after:translate-x-1/2 "> Our Approach</h1>
           </div>
           <section id="advocacy">
           <div className="flex flex-col  items-start md:gap-8 gap-4 md:px-20 md:mb-16 mb-8">
           <h1 className="md:text-4xl text-xl font-bold font-poppins
           relative inline-block  after:border-b-8 after:border-blue-800 after:block pb-4 
           after:w-20 md:after:w-40 after:absolute after:bottom-0 after:left-0" >Advocating for Rights and Inclusion.</h1>
            <div className="flex flex-col   md:gap-10 gap-6">
               <p className="font-poppins md:text-base text-sm md:leading-8 leading-6">
               We champion the rights of women and young persons with disabilities by 
               advocating for their full inclusion in all aspects of society. 
               Through community engagement, storytelling campaigns, and collaborations with stakeholders,
                we work to break barriers, eliminate stigma, and promote a culture of equality and respect.
                </p>
                
                <div className="">
                <Image src='/images/policychange.jpeg' 
                alt="group photos of women and girls " width={400} height={312}
                className="h-[223px] w-[300px]  md:w-[554px] md:h-[312px] object-cover"/>
                <span className="block text-xs">
                   group photo of women and girls 
                </span>
                </div>
              
            </div>
           </div>
           </section>
           
           <section id="policy">
           <div className="flex flex-col  items-start md:gap-8 gap-4 md:px-20 md:mb-16 mb-8">
            <h1 className="md:text-4xl text-xl font-bold font-poppins
            relative inline-block  after:border-b-8 after:border-blue-800 after:block pb-4 
            after:w-20 md:after:w-40 after:absolute after:bottom-0 after:left-0" > Driving Inclusive Policy Change.</h1>
             <div className="flex flex-col   md:gap-10 gap-6">
                <p className="font-poppins md:text-base text-sm md:leading-8 leading-6">
                We actively influence and shape policies to ensure they address 
                the needs of persons with disabilities. 
                From September to November 2024, 
                we led an advocacy campaign in Benue State focused on inclusive
                 climate change policies for women and youth with disabilities. This initiative involved direct engagement with stakeholders 
                 and culminated in a dialogue meeting on October 29, 2024, where key government officials collaborated with women and girls 
                 with disabilities to develop actionable recommendations for inclusive climate change policies.
                 </p>
                 <div className="">
                 <Image src='/images/grouppic.jpeg' 
                 alt="stakeholders including men and women" width={400} height={312}
                 className="h-[223px] w-[300px]  md:w-[554px] md:h-[312px] object-cover"/>
                 <span className="block text-xs">
                     stakeholders including men and women
                 </span>
                 </div>
               
             </div>
            </div>
           </section>
            
            <section id="education">
            <div className="flex flex-col  items-start md:gap-8 gap-4 md:px-20 md:mb-16 mb-8">
            <h1 className="md:text-4xl text-xl font-bold font-poppins
            relative inline-block  after:border-b-8 after:border-blue-800 after:block pb-4 
            after:w-20 md:after:w-40 after:absolute after:bottom-0 after:left-0" > Promoting Inclusive Education.</h1>
             <div className="flex flex-col   md:gap-10 gap-6">
                <p className="font-poppins md:text-base text-sm md:leading-8 leading-6">
                We believe education is a fundamental right and a powerful tool for 
                inclusion and empowerment. On July 11, 2024, we visited Government Secondary School Kwali, 
                Abuja, where we educated students with disabilities about the importance 
                of inclusivity. We encouraged them to explore diverse career paths, schools,
                 and opportunities beyond institutions exclusively for students with disabilities. 
                 This effort aims to break societal barriers and inspire them to thrive in diverse environments, 
                 fostering inclusion at every level of education.
                 </p>
                 <div className="">
                 <Image src='/images/student.jpeg' 
                 alt="students being educated on inclusive education" width={400} height={312}
                 className="h-[223px] w-[300px]  md:w-[554px] md:h-[312px] object-cover"/>
                 <span className="block text-xs">
                     students being educated on inclusive education
                 </span>
                 </div>
               
             </div>
            </div>
           </section>
            
            <section id="sexualhealth">
            <div className="flex flex-col  items-start md:gap-8 gap-4 md:px-20 md:mb-16 mb-8">
            <h1 className="md:text-4xl text-xl font-bold font-poppins
            relative inline-block  after:border-b-8 after:border-blue-800 after:block pb-4 
            after:w-20 md:after:w-40 after:absolute after:bottom-0 after:left-0" > Promoting Sexual and Reproductive Health and Rights.</h1>
             <div className="flex flex-col   md:gap-10 gap-6">
                <p className="font-poppins md:text-base text-sm md:leading-8 leading-6">
                We advocate for access to comprehensive sexual and reproductive health (SRH) services for women 
                and young persons with disabilities. On June 1, 2023, we trained 70 young persons
                 with disabilities, including young women, on their rights to access SRH care and 
                 facilities. The training emphasized topics such as menstrual health management, access 
                 to contraceptives, and family planning. This initiative empowers participants to take charge
                  of their health and advocate for their rights.
                 </p>
                 <div className="">
                 <Image src='/images/sexualreproductivehealth.jpeg' 
                 alt="A woman addressiing youths on sexual reproductive health" width={400} height={312}
                 className="h-[223px] w-[300px]  md:w-[554px] md:h-[312px] object-cover"/>
                 <span className="block text-xs">
                     A woman addressiing youths on sexual reproductive health
                 </span>
                 </div>
               
             </div>
            </div>
           </section>
            
        </div>
    )
}