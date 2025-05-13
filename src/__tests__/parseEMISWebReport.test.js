// import parseEMISWebReport from "../parsers/parseEMISWebReport"
const parseEMISWebReport = require("../lib/parsers/parseEMISWebReport")

describe('parseEMISWebReport', () => {
   it('should return an object with NHS number as the key and patient details as the value', () => {
      //Arrange 
      const csvString ="Full Name,Age,Gender,NHS number,Date of birth,Mobile number\nPatient-1,73,Male,NHS-1,01/01/1900,0700-1"
      //Act
      const result = parseEMISWebReport(csvString)
      //Assert 
      expect(result).toEqual(
         {
            "NHS-1" : {"Full Name": 'Patient-1', "Age": '73', "Gender": 'Male', "NHS number": 'NHS-1', "Date of birth": '01/01/1900', "Mobile number" : "0700-1"}
         })
   })
})