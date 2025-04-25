import { useRef, useState } from "react";
import GpSystems from "../enums/GpSystems";
import parseSystmOne from "../lib/parsers/parseSystmOne";


//Custom hook that allows us to input a file or folder
export default function useFileImport(gpSystemSelected){

   const fileInputRef = useRef();
   const [importError, setImportError] = useState('');
   const handlers = {
      // [GpSystems.EMIS_Web] : handleEMISWebReport,
      [GpSystems.SystmOne] : parseSystmOne
   }
   
   
   const handleImportButtonClick = ()=> {
      if (gpSystemSelected === GpSystems.NotSelected){
         setImportError('Please select a clinical system before import.');
         return
      }
      else{
         if(fileInputRef.current){
            fileInputRef.current.value= "";
            fileInputRef.current.click();
         }   
      }
   }
   const handler = handlers[gpSystemSelected];

   const handleFileChange = (event)=> {
      const files = event.target.files;
      if (files.length === 0){
         setImportError('The folder you have uploaded is empty. Please select another folder.')
         return;
      };

      if(!handler){
         setImportError('Unsupported clinical system selected.');
         return;
      }
      else {
         handler(files)
      }

   }
   
   return { fileInputRef, handleImportButtonClick, importError, setImportError, handleFileChange}
}