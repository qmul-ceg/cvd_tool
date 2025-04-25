const parseSystmOne = (files)=>{
   // console.log(typeof(files))
   
   let count = 0;
   // let reportOne;
   // let reportTwo;
   // let reportThree;
   
   const reports = {}
   for (let i = 0; i < files.length; i++){
      let file = files[i]
      const reader = new FileReader()
      
      reader.onload = () => {
         const lines = reader.result.split('\n')
         const headerArray = lines[0].split(',');
         console.log(headerArray)
         // console.log(lines[1])
         count++;

         
         if (headerArray[0] === "Full Name" && headerArray[1] === 'Age'){
            reports["report1"] = file
           
         }
         else if (headerArray[0] === "NHS number" && headerArray[1] === 'Frailty'){
            reports["report2"] = file
         }
         else{
            reports["report3"] = file
         }
         
         const parsed_data = []
        
         //Parse each file.
         if (count === 3){
            
            const reader = new FileReader();

            reader.onload = () => {
               const report_string = reader.result
               const report_array = report_string.split('\n')
               const report_header_array = report_array[0].split(',')
               console.log(report_header_array)

               
               for(let i = 1; i < report_array.length; i++){
                  // report_array[i].split(',')
                  let row_array = report_array[i].split(',')
                  const report_object = {}
                  for (let i = 0; i < row_array.length; i++){ 
                     
                     report_object[report_header_array[i]] = row_array[i]
                     
                  }
                  parsed_data.push(report_object)
               }
               console.log(parsed_data)
            }
            
            
            
            
            
            reader.onerror = ()=>{
               console.log(reader.error)
            }

            reader.readAsText(reports['report1'])
            // console.log(reports['report1'])

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