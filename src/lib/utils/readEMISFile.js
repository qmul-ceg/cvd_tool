// function doSomething() {
//    return new Promise((resolve) => {
//      setTimeout(() => {
//        // Other things to do before completion of the promise
//        console.log("Did something");
//        // The fulfillment value of the promise
//        resolve("https://example.com/");
//      }, 200);
//    });
//  }

const parseEMISWebFile = (file) =>{
   const fileToRead = file[0]
   console.log()
   if(!file){
      console.log("No file to be read")
   }

   const reader = new FileReader()

   reader.onload = (file)=> {
      const result = reader.result
      console.log(typeof(result))
   }

   reader.onerror = ()=>{
      console.log(error)
   }

   reader.readAsText(fileToRead)

}

export default parseEMISWebFile;