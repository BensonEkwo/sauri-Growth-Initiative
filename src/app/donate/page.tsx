'use client'
import React, { useEffect } from "react";
export default function page(){
    useEffect(() => {
        // Inject the Donorbox script dynamically
        const script = document.createElement("script");
        script.src = "https://donorbox.org/widget.js";
        script.async = true;
        script.setAttribute("paypalExpress", "true");
        document.body.appendChild(script);
    
        // Cleanup script on component unmount
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    return(
        <div className="flex flex-col items-center  md:mx-0 mt-28 mb-12 mx-6  ">
           
 
    <div className="w-full my-6 flex items-center justify-center">
      <iframe
        src="https://donorbox.org/embed/project-support-4?language=en-us"
        name="donorbox"
        allow="payment"
        allowPaymentRequest
        seamless="seamless"
        frameBorder="0"
        scrolling="no"
        style={{ maxWidth: "500px", minWidth: "250px", width: "100%", height: "900px" }}
      ></iframe>
    </div>
    </div>
    )
}


