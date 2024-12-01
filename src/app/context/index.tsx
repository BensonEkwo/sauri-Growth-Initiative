'use client'
import { createContext,useState ,useContext} from "react"
// type myContextType={
//     isOpen:boolean;
//     setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
// }
const myContext= createContext<any>(undefined)
 export const Appwrapper=({children}: {
    children: React.ReactNode;
  })=>{
const [isOpen,setIsOpen]= useState(false)
return(
    <myContext.Provider value={{isOpen,setIsOpen}}>
        {children}
    </myContext.Provider>
)
}
export const UseMyContext=()=>{
    return useContext(myContext)
}