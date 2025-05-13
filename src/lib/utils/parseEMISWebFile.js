

const parseEMISWebFile = (file) =>{
   const fileToRead = file[0]
   console.log()
   if(!file){
      console.log("No file to be read")
   }

   const reader = new FileReader()

   reader.onload = (file)=> {
      const result = reader.result
      console.log(result)
   }

   reader.onerror = ()=>{
      console.log(error)
   }

   reader.readAsText(fileToRead)
   // const fileToRead = file[0]
   // console.log(fileToRead)
}

export default parseEMISWebFile;