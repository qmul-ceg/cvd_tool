const parseSystmOne = (files)=>{

   const masterReport = {};
   let count = 0; 
   const reports = {
      report1: null,
      report2: null,
      report3: null
   };
   
   const readFiles = new Promise((resolve, reject) => {
      for (let i = 0; i < files.length; i++){
         let file = files[i];
         const reader = new FileReader()
         
         reader.onload = () => {
            const lines = reader.result.split('\n')
            const headerArray = lines[0].split(',');
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
            
            
            if(Object.values(reports).every(value => value)){
               resolve(reports)
            }

            reader.onerror=()=>{
               console.log(reader.error)
            }

            reader.readAsText(file)
         }   
      } 
   })

                  


   const parseReportFile = (file) => {
      return new Promise ((resolve, reject) => {
         const reader = new FileReader();
         reader.onload = () => {
            const report_string = reader.result; //Report as a string
            const report_array = report_string.split('\n'); //Return an array of the string splitting each one at the new line
            const report_header_array = report_array[0].split(',');
            
            //Changing headers for report 3 
            if(report_header_array[1].trim() === "Antiplatelet"){
               for (let i = 0; i < report_header_array.length; i++){
                  if (report_header_array[i] === "Date of issue"){
                     const medicationName = report_header_array[i-1];
                     report_header_array[i] = `${report_header_array[i]} - ${medicationName}`.trim();
                  }
               }
            }
            const report_object_array = [] 
            // Each file will be stored in an array containing a row of object
            for(let i = 1; i < report_array.length; i++){
               let row_array = report_array[i].split(',');
               const report_object = {}    
               for (let i = 0; i < row_array.length; i++){
                  report_object[report_header_array[i]] = row_array[i]; 
               }
               report_object_array.push(report_object); 
            } 
            resolve(report_object_array)
         }

         reader.onerror = ()=>{
            console.log(reader.error)
         }

         reader.readAsText(file)       
      })
   }

   Promise.all
   ([parseReportFile(reports["report1"]), 
      parseReportFile(reports["report2"]), 
      parseReportFile(reports["report3"])]).then((parsed_reports) => {
         for (const report of parsed_reports){
            for (const object of report){
               const nhs_number_check = object['NHS number']
               if(nhs_number_check){
                  if(Object.hasOwn(masterReport, nhs_number_check)){
                     Object.assign(masterReport[nhs_number_check], object)
                  }
                  else{
                     masterReport[nhs_number_check] = object
                  }
               } 
            }
         }
      })
   }

   //             reader.onerror=()=>{
   //                console.log(reader.error)
   //             }

   //             reader.readAsText(file)
   //    } 
   // })
  


export default parseSystmOne

// resolve(reports)

                  // console.log(promises_array)
                  //Get array of promises that will be passed on to the 

                  //LOOK AT REPORTS
                  // const parsed_reports = [];
                  // let count_two = 0
                  //Parse each file.
                  // Promise.all(promises_array).then(results => {
                  //    for (const report in reports){

                  //       const reader = new FileReader();
                  //       reader.onload = () => {
                  //          const report_string = reader.result; //Report as a string
                  //          const report_array = report_string.split('\n'); //Return an array of the string splitting each one at the new line
                  //          const report_header_array = report_array[0].split(',');
                           
                  //          //Changing headers for report 3 
                  //          if(report_header_array[1].trim() === "Antiplatelet"){
                  //             for (let i = 0; i < report_header_array.length; i++){
                  //                if (report_header_array[i] === "Date of issue"){
                  //                   const medicationName = report_header_array[i-1];
                  //                   report_header_array[i] = `${report_header_array[i]} - ${medicationName}`.trim();
                  //                }
                  //             }
                  //          }
                  //          // console.log(report_header_array)
                  
                  //          const report_object_array = [] // Each file will be stored in an array containing a row of object
                  //          for(let i = 1; i < report_array.length; i++){
                  //             let row_array = report_array[i].split(',');
                  //             const report_object = {}    
                  //             for (let i = 0; i < row_array.length; i++){
                  //                report_object[report_header_array[i]] = row_array[i]; 
                  //             }
                  //             report_object_array.push(report_object); 
                  //          } 
                  //          parsed_reports.push(report_object_array);
                  //          count_two++;
                  //          // console.log(parsed_reports)
                        
                  //          if(count_two == 3 ){
                              // for (const report of parsed_reports){
                              //    for (const object of report){
                              //       const nhs_number_check = object['NHS number']
                              //       if(nhs_number_check){
                              //          if(Object.hasOwn(masterReport, nhs_number_check)){
                              //             Object.assign(masterReport[nhs_number_check], object)
                              //          }
                              //          else{
                              //             masterReport[nhs_number_check] = object
                              //          }
                              //       } 
                              //    }
                              // }
                           
                  //       }
                        
                  //       reader.onerror = ()=>{
                  //          console.log(reader.error)
                  //       }
                  //       reader.readAsText(reports[report])       
                  //    }

                  // })
//Loop through each file in the FileList
// For each file:
   //- Use FileReader to read the content
   //- Extract the first line(headers)
   //- Use header to identify whether its Report 1, 2 or 3
//Parse them 
//Merge based on NHS number 
// 
// 
// // if (count === 3){
                     
                  //    for (const report in reports){

                  //       const reader = new FileReader();
                  //       reader.onload = () => {
                  //          const report_string = reader.result; //Report as a string
                  //          const report_array = report_string.split('\n'); //Return an array of the string splitting each one at the new line
                  //          const report_header_array = report_array[0].split(',');
                           
                  //          //Changing headers for report 3 
                  //          if(report_header_array[1].trim() === "Antiplatelet"){
                  //             for (let i = 0; i < report_header_array.length; i++){
                  //                if (report_header_array[i] === "Date of issue"){
                  //                   const medicationName = report_header_array[i-1];
                  //                   report_header_array[i] = `${report_header_array[i]} - ${medicationName}`.trim();
                  //                }
                  //             }
                  //          }
                  //          // console.log(report_header_array)
                  
                  //          const report_object_array = [] // Each file will be stored in an array containing a row of object
                  //          for(let i = 1; i < report_array.length; i++){
                  //             let row_array = report_array[i].split(',');
                  //             const report_object = {}    
                  //             for (let i = 0; i < row_array.length; i++){
                  //                report_object[report_header_array[i]] = row_array[i]; 
                  //             }
                  //             report_object_array.push(report_object); 
                  //          } 
                  //          parsed_reports.push(report_object_array);
                  //          count_two++;
                  //          console.log(parsed_reports)
                        
                  //          if(count_two == 3 ){
                  //             for (const report of parsed_reports){
                  //                for (const object of report){
                  //                   const nhs_number_check = object['NHS number']
                  //                   if(nhs_number_check){
                  //                      if(Object.hasOwn(masterReport, nhs_number_check)){
                  //                         Object.assign(masterReport[nhs_number_check], object)
                  //                      }
                  //                      else{
                  //                         masterReport[nhs_number_check] = object
                  //                      }
                  //                   } 
                  //                }
                  //             }
                  //          } 
                  //       }
                        
                  //       reader.onerror = ()=>{
                  //          console.log(reader.error)
                  //       }
                  //       reader.readAsText(reports[report])       
                  //    }
                  //    return masterReport
                  // }