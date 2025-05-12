

const parseEMISWebReport = (file) => {

      const lines = file.split("\n");
      const headerArray = lines[0].split(",");
      const values = lines[1].split(",")

      const masterReport = {}
      const rowData = {}
      let key;
      for (let i = 0; i < headerArray.length; i++){
         rowData[headerArray[i]] = values[i];
         if(headerArray[i] === 'NHS number'){
            key = values[i]
         }
      }
      masterReport[key] = rowData
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

   // reader.readAsText(file);