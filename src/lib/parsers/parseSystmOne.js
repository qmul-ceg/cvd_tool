const parseSystmOne = (files)=>{
   // console.log(typeof(files))
   
   let count = 0;
   let reportOne;
   let reportTwo;
   let reportThree;
   

   for (let i = 0; i < files.length; i++){
      let file = files[i]
      const reader = new FileReader()
      
      reader.onload = () => {
         const lines = reader.result.split('\n')
         const headerArray = lines[0].split(',');
         console.log(headerArray)
         count++;
         if (headerArray[0] === "Full Name" && headerArray[1] === 'Age'){
            reportOne = file 
         }
         else if (headerArray[0] === "NHS number" && headerArray[1] === 'Frailty'){
            reportTwo = file 
         }
         else if (headerArray[0] === "NHS number" && headerArray[1] === 'Antiplatelet'){
            reportThree = file 
         }
      }

      reader.onerror=()=>{
         console.log(reader.error)
      }

      reader.readAsText(file)
      
   }
   
//Loop through each file in the FileList
// For each file:
   //- Use FileReader to read the content
   //- Extract the first line(headers)
   //- Use header to identify whether its Report 1, 2 or 3
//Parse them 
//Merge based on NHS number

}

export default parseSystmOne