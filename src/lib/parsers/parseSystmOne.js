const parseSystmOne = (files)=>{
   // console.log(typeof(files))
   const masterReport = {}
   let count = 0; 
   const reports = {}
   for (let i = 0; i < files.length; i++){
      let file = files[i]
      const reader = new FileReader()
      
      reader.onload = () => {
         const lines = reader.result.split('\n')
         const headerArray = lines[0].split(',');
         // console.log(headerArray)
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
         

         const parsed_reports = []
         let count_two = 0
         //Parse each file.
         if (count === 3){
            
            
            for (const report in reports){

               const reader = new FileReader();
               reader.onload = () => {
                  const report_string = reader.result //Report as a string
                  const report_array = report_string.split('\n') //Return an array of the string splitting each one at the new line
                  const report_header_array = report_array[0].split(',')

                  const report_object_array = []
                  for(let i = 1; i < report_array.length; i++){
                     let row_array = report_array[i].split(',')
                     const report_object = {}    
                     for (let i = 0; i < row_array.length; i++){
                        report_object[report_header_array[i]] = row_array[i] 
                     }
                     report_object_array.push(report_object) 
                  } 
                  parsed_reports.push(report_object_array)
                  count_two++
               
                  console.log(parsed_reports)

                  if(count_two == 3 ){
                     for (const report of parsed_reports){
                        for (const object of report){
                           // const keys = Object.keys(object)

                           for (const [key, value] of Object.entries(object)){
                              const nhsKey = 'NHS number'
                              if(object[nhsKey]) {
                                 console.log(object[nhsKey])
                              } 
                              return; 
                              
                           }
                        }
                        
                        // for (const object in report){
                        //    console.log(object)
                           // for (const [key, value] of Object.entries(object)){
                           //    console.log(key + value)
                           //    return
                           // }
                           // let key = 'NHS number'
                           //    if (object[key]){
                           //       console.log(object[key])
                           //       return
                           //    }
                                 
                        }
                     
                  }
                  
               //loop through reports list
                           
                              //loop through each array of objects
                                 //check for the NHS number check if it is true
                                    // check if it is an object key in the master object
                                       // if it is add the row to the object
                                       // it is not add the use the key as an object

                  
               }
               
               reader.onerror = ()=>{
                  console.log(reader.error)
               }

               reader.readAsText(reports[report])
               
               
               
            }


           
            


         }
      }

      reader.onerror=()=>{
         console.log(reader.error)
      }
      reader.readAsText(file)
   }

}

export default parseSystmOne


//Loop through each file in the FileList
// For each file:
   //- Use FileReader to read the content
   //- Extract the first line(headers)
   //- Use header to identify whether its Report 1, 2 or 3
//Parse them 
//Merge based on NHS number