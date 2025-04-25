import { useEffect, useRef, useState } from "react"



function App() {
   // const fileInputRef = useRef()

   // useEffect(()=>{
   //    if(fileInputRef.current){
   //       fileInputRef.current.setAttribute('webkitdirectory', '');
   //    }
   // }, [])

   return (
      <>

           
            <input 
           
            // name="directory"
            // ref= {fileInputRef}
               onChange={(event)=> console.log(event.target.files)}
               type="file" 
               webkitdirectory = "true"
               multiple
            />
 
         
      </>
         
   )
}

export default App
