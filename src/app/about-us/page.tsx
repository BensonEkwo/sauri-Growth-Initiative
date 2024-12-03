import Image from "next/image"
export default function page(){
    return(
        <div className="flex flex-col items-center md:items-start  mx-0 mt-16  w-full mb-10 md:mb-16">
          <div className="w-full relative">
            <Image src='/images/IMG_2469.JPG' alt="members of sauri growth initiative" 
            width={1146} height={350} quality={100} className="w-full h-[200px] md:h-[350px] object-cover"/>
          </div>
          <div className="flex flex-col items-start justify-center  bg-white md:ml-28
         w-80 md:w-[700px] px-6 md:px-8 text-blue-950 shadow-md -mt-10 md:-mt-16 z-30 py-4 md:py-5">
        <div className="space-y-4 md:space-y-6">
        <h1 className=" text-2xl md:text-4xl font-bold">
            About Us
        </h1>
        <h1 className=" text-lg md:text-xl font-semibold md:leading-8">
            The Sauri Growth Initiative for women and Youth with Disabilities
            is a non-profit organization committed to empowering women and youth disabilities.
        </h1>
        <p className="font-poppins text-sm leading-6 md:leading-8 md:text-base ">
       The organization was duly registered in 2022 and has since then financed a couple of activities 
       to empower young women and girls with disabilities not until this year 2024.
        </p>
        <p className="font-poppins text-sm leading-6 md:leading-8 md:text-base ">
       We got a grant from Urgent Action Fund Africa, which was used to embark on a 
       a project "Empowering women and Girls with disabilities through inclusive Climate change actions and 
       policies".
        </p>
        <p className="font-poppins text-sm leading-6 md:leading-8 md:text-base ">
        Our primary goal is to combat discrimination and foster inclusivity across all facets of society.
            We are driven by the mission to ensure that women and girls with disabilities have equal opportunitiesto thrive in the 
            workforce, education, and political arenas.
        </p>
        <p className="font-poppins text-sm leading-6 md:leading-8 md:text-base ">
            We firmly beleive in nurturing the potential of young people with disabilities
            to a actively contribute to society and economic development.
            Our overaching objective is to establish an inclusive and accessible environment 
            for individuals withh disabilities, irrespective of gender, age, or disability type.
        </p>
        </div>
        <div className="space-y-4 mt-4 md:space-y-6">
            <h1 className="text-lg font-semibold md:text-xl">
                Vision
            </h1>
            <p className="text-sm font-poppins md:leading-8 md:text-base leading-6 ">
                A world where women and youth with children with disabilities can thrive,
                experiencing equal acess and opportunities without discrimination or barriers.
            </p>
        </div>
        <div className="space-y-4 mt-4 md:space-y-6">
            <h1 className="text-lg font-semibold md:text-xl">
                Mission
            </h1>
            <p className="text-sm font-poppins md:leading-8 md:text-base leading-6` ">
               To empower and youth with disabilities through inclusive education, advocacy, and 
               accessible resources, promoting equal participation in:
            </p>
            <ul className="list-disc pl-8 font-poppins text-sm space-y-2 md:space-y-3 md:text-base">
                <li>
                    Governance and politics
                </li>
                <li>
                    Employment
                </li>
                <li>
                    Sexual and reproductive health
                </li>
               </ul>
        </div>
        <div className="space-y-4 mt-4 md:space-y-6">
            <h1 className="text-lg font-semibold md:text-xl">
                Core values
            </h1>
            <ul className="list-disc pl-8 font-poppins text-sm space-y-2 md:space-y-3 md:text-base">
                <li>
                    Inclusivity and accessibility
                </li>
                <li>
                    Empowerment and self determination
                </li>
                <li>
                    Equality and social justice 
                </li>
                <li>
                    Collaboration and partnership
                </li>
               </ul>
        </div>
        <div className="space-y-4 mt-4 md:space-y-6">
            <h1 className="text-lg font-semibold md:text-xl">
                Our pillars
            </h1>
            <ul className="list-disc pl-8 font-poppins text-sm space-y-2 md:space-y-3 md:text-base">
                <li>
                    Inclusive Education: accessible quallity eduaction
                </li>
                <li>
                   Sexual Reproductive health Rights(SRHR): informed choices
                </li>
                <li>
                    Economic Empowerment: fulfilling work 
                </li>
                <li>
                    Advocacy and policy change: equality and inclusion
                </li>
               </ul>
        </div>
        <div className="space-y-4 mt-4 md:space-y-6">
            <h1 className="text-lg font-semibold md:text-xl">
            Our Work
            </h1>
            <p className="text-sm font-poppins md:leading-8 md:text-base leading-6 ">
            We focus on advocacy, empowerment, and inclusion for women and young persons
             with disabilities.
            </p>
            <h1 className="text-lg font-semibold md:text-xl">
            Our key initiatives include
            </h1>
            <p className="text-sm font-poppins md:leading-8 md:text-base leading-6 ">
            Promoting rights and inclusion in leadership, governance, and policymaking
Advocating for accessible sexual and reproductive health services
Driving inclusive education and dignified work opportunities
Training, capacity-building, and policy advocacy.
            </p>
        </div>
        <div className="space-y-4 mt-4 md:space-y-6">
            <h1 className="text-lg font-semibold md:text-xl">                
            What Sets Us Apart
            </h1>
            <p className="text-sm font-poppins md:leading-8 md:text-base leading-6">
            As an organization led by individuals with disabilities, we bring a unique perspective 
            and approach to our work. Our lived experiences inform our strategies and ensure that our initiatives are authentic and effective.
            </p>
        </div>
        <div className="mt-4 flex flex-col items-start gap-4 md:gap-10">
            <h1 className="text-lg font-semibold md:text-xl">
                Our Team
            </h1>
            <div className="flex items-center justify-between gap-4 md:gap-10">
                <Image src="/images/bae73f08-9e15-44d8-9faa-b243597245db.JPG"
                 alt="excutive director Comfort Ekwo" width={192} height={192}
                 className="rounded-full w-28 h-28 md:w-48 md:h-48 object-cover"/>
                 <h1><span className=" font-semibold md:text-lg">Comfort Ekwo</span>
                 <span className="block text-sm md:text-base md:mt-1">Executive Director</span></h1>
                 
            </div>
            <div className="flex items-center justify-between gap-4 md:gap-10">
                <Image src="/images/PHOTO-2024-11-12-13-58-47.jpg"
                 alt="Project Manager Precious Nneka" width={192} height={192}
                 className="rounded-full w-28 h-28 md:w-48 md:h-48 object-cover"/>
                 <h1><span className=" font-semibold md:text-lg">Ogbodo Precious Nneka</span>
                 <span className="block text-sm md:text-base md:mt-1">Project Manager</span></h1>
                 
            </div>
            <div className="flex items-center justify-between gap-4 md:gap-10">
                <Image src="/images/officer.jpeg"
                 alt="excutive director Comfort Ekwo" width={192} height={192}
                 className="rounded-full w-28 h-28 md:w-48 md:h-48 object-cover"/>
                 <h1><span className=" font-semibold md:text-lg">Janet Alabi</span>
                 <span className="block text-sm md:text-base md:mt-1">Financial Officer</span></h1>
                 
            </div>
        </div>
          </div>
        </div>
    )
}