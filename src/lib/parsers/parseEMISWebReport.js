
const parseEMISWebReport = (csvString) => {
   const lines = csvString.split("\n");
   const headerArray = lines[0].split(",");

   let rowsArray = []
   let masterReport = {}
   for (let i = 1; i < lines.length; i++){
      rowsArray.push(lines[i].split(","));
   }

   for(let i = 0; i < rowsArray.length; i++ ){
      let row = rowsArray[i]
      let rowObject = {}
      let key;
      for (let j = 0; i < headerArray.length; i++){
         rowObject[headerArray[i]] = row[i]
         if(headerArray[i] === 'NHS number'){
            key = row[i]
         }
      }
      masterReport[key] = rowObject
   }
   return masterReport
}

module.exports = parseEMISWebReport;

// export default parseEMISWebReport// const reader = new FileReader();

   // reader.onload = () => {
   //    const lines = reader.result.split("\n");
   //    const headerArray = lines[0].split(",");
   //    const values = lines[1].split(",")

   //    const masterReport = {}
   //    const rowData = {}
   //    for (let i = 0; i < headerArray.length; i++){
   //       rowData[headerArray[i]] = values[i];
   //       let key = headerArray["NHS number"]
   //    }
   //    masterReport[key] = rowData
   //    return masterReport
   // }

   // reader.onerror= ()=> {
   //    console.log(error);
   // }

   // reader.readAsText(file); // for (let i = 0; i < headerArray.length; i++){
   //    let patientRow = {};
   //    patientRow[headerArray[i]] = rows[i][i];
   //    if(headerArray[i] === 'NHS number') {//Change this to Anonymised identifier
   //       masterReport[values[i]] = patientRow;
   //    }

   // }
      // const lines = file.split("\n");
      // const headerArray = lines[0].split(",");
      // const values = lines[1].split(",")

      // const masterReport = {}
      // const rowData = {}
      // let key;
      // for (let i = 0; i < headerArray.length; i++){
      //    rowData[headerArray[i]] = values[i];
      //    if(headerArray[i] === 'NHS number'){
      //       key = values[i]
      //    }
      // }
      // masterReport[key] = rowData
      // return masterReport