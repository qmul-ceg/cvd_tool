const parseSystmOne = (files)=>{
   const filesArray = Array.from(files) //Converted FileList to an array
   const masterReport = {};
   
   const readFiles = (files) => {
      const sortFilesPromise = filesArray.map(file => {
         return new Promise((resolve, reject) => {

            const reportObj = {
               key: null,
               file: null
            }

            const reader = new FileReader();
            
            reader.onload = () => {
               const lines = reader.result.split('\n')
               const headerArray = lines[0].split(',');
               

               
               if (headerArray[0] === "Full Name" && headerArray[1] === 'Age'){
                  reportObj['key'] = 'report1'
                  reportObj['file'] = file
               
               }
               else if (headerArray[0] === "NHS number" && headerArray[1] === 'Frailty'){
                  reportObj['key'] = 'report2'
                  reportObj['file'] = file
               }
               else{
                  reportObj['key'] = 'report3'
                  reportObj['file'] = file
               }
               resolve(reportObj)
            } 

            reader.onerror =() =>{
               reject(reader.error);
            }

            reader.readAsText(file);
         })
      });

      return Promise.all(sortFilesPromise).then(results => {
         const reports = results.reduce((acc, report) =>{
            acc[report.key]  = report.file;
            return acc
         }, {})
         return reports;
      })

   }
                  
   

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
            resolve(report_object_array);
         }

         reader.onerror = ()=>{
            reject(reader.error);
         }
         reader.readAsText(file);   
      })
   }


   return readFiles(files).then(reports => {
      return  Promise.all([
         parseReportFile(reports["report1"]), 
         parseReportFile(reports["report2"]), 
         parseReportFile(reports["report3"])]).then((parsedReports) => {
            for (const report of parsedReports){
               for (const object of report){
                  const nhs_number_check = object['NHS number'];
                  if(nhs_number_check){
                     if(Object.hasOwn(masterReport, nhs_number_check)){
                        Object.assign(masterReport[nhs_number_check], object);
                     }
                     else{
                        masterReport[nhs_number_check] = object;
                     }
                  } 
               }
            }
            return masterReport
         })
   })
}

export default parseSystmOne
 