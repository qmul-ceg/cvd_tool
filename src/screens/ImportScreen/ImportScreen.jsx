import React, { useState } from 'react'
import useFileImport from '../../hooks/useFileImport'
import GpSystems from '../../enums/GpSystems'

const ImportScreen = () => {
   
   const [selectedGpSystem, setSelectedGpSystem] = useState(GpSystems.NotSelected)
   const { 
      fileInputRef, 
      handleImportButtonClick, 
      importError, 
      setImportError, 
      handleFileChange
   } = useFileImport(selectedGpSystem);
   
   
   
   const handleSelectGpSystem = (event) => {
      setImportError('')
      setSelectedGpSystem(event.target.value)
   }


   const clinicalSystemSelect = 
      selectedGpSystem === GpSystems.SystmOne ?
         { 
         ref: fileInputRef,
         type: "file",
         onChange: handleFileChange,
         webkitdirectory: "true",
         multiple: true,
         style:{display:"none"}
         } : { 
            ref:fileInputRef,
            type: "file",
            onChange : handleFileChange,
            style: {display:"none"} 
         }

   return (
         <div>
            <label>
               EMIS Web
               <input 
                  type="radio" 
                  name="GpSystem"
                  value= {GpSystems.EMIS_Web}
                  checked={selectedGpSystem === GpSystems.EMIS_Web}
                  onChange={handleSelectGpSystem}
               />
            </label>

            <label>
               SystmOne
               <input 
                  type="radio" 
                  name="GpSystem"
                  value= {GpSystems.SystmOne}
                  checked={selectedGpSystem === GpSystems.SystmOne}
                  onChange={handleSelectGpSystem}
               />
            </label>

            <input 
               {...clinicalSystemSelect}
            />


            {
               importError && (
                  importError
               )
            }
            <button
               onClick={handleImportButtonClick}
            >
               Import
            </button>

         </div>
   )
}

export default ImportScreen
