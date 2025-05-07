import React, { useState } from 'react'
import useFileImport from '../../hooks/useFileImport'
import GpSystems from '../../enums/GpSystems'
import { Button } from '@/components/ui/button'

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
      <div className = "flex justify-center  items-start h-screen bg-[#21376A]">
         
         <div className = " w-[40%] max-w-[500px] mt-[20vh] border text-center py-12 rounded-t-lg bg-white">
            <div>
               <h1 className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-sourceSans font-bold text-[#21376A]">
                  Clinical Effectiveness Group
               </h1>
               <h1  className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-sourceSans font-bold text-[#21376A]">
                  CVD tool
               </h1>
            </div>
            
            

            <div className=" max-w-[370px]  m-auto mt-4 mb-4 font-semibold">
               <p>This tool has been created to present clinical information coded in the patient health record. It is not a diagnostic tool or intended to replace clinical judgement.</p>
            </div>

            <div className="flex flex-col justify-center items-center mb-6">
               <h2 className="text-xl font-medium text-[#21376A]">Select clinical system and import CSV file </h2>
               <div className="flex items-center mt-4 gap-10 font-bold text-[#21376A]">
                  <label className="text-xl flex flex-col items-center" htmlFor='emis_default_radio'>
                     EMIS Web
                     <input 
                        id="emis_default_radio"
                        type="radio" 
                        name="GpSystem"
                        value= {GpSystems.EMIS_Web}
                        checked={selectedGpSystem === GpSystems.EMIS_Web}
                        onChange={handleSelectGpSystem}
                     />
                     <div className="emis_custom_radio cursor-pointer"></div>
                  </label>

                  <label className="text-xl flex flex-col items-center" htmlFor='systmone_default_radio'>
                     SystmOne
                     <input 
                        type="radio" 
                        id="systmone_default_radio"
                        name="GpSystem"
                        value= {GpSystems.SystmOne}
                        checked={selectedGpSystem === GpSystems.SystmOne}
                        onChange={handleSelectGpSystem}
                     />
                     <div className="systmone_custom_radio cursor-pointer"></div>
                  </label>
               </div>
               { importError && <div className = " text-sm text-red-600">{importError}</div> }
            </div>
            
            <div>
               <input 
                  {...clinicalSystemSelect}
               />
               <Button
                  className="text-center bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white w-[6em] text-lg import_button" 
                  onClick={handleImportButtonClick}
               >
                  Import
               </Button>
            </div>
         </div>
      </div>
   )
}

export default ImportScreen
