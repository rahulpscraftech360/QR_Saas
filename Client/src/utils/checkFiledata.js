import * as XLSX from "xlsx";
import Papa from "papaparse";

export const checkFileData = (
  file,
  setFileFields,
  setNumberOfPeople,
  setFileData
) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const content = event.target.result;
    const fileExtension = file.name
      .split(".")
      .pop()
      .toLowerCase();

    try {
      let data;

      if (fileExtension === "json") {
        data = JSON.parse(content);
      } else if (fileExtension === "xls" || fileExtension === "xlsx") {
        const workbook = XLSX.read(content, { type: "binary" });
        const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
        data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      } else if (fileExtension === "csv") {
        data = Papa.parse(content, { header: true }).data;
      } else {
        throw new Error("Unsupported file format");
      }

      console.log(data);
      setFileData(data);

      const availableFields = Object.keys(data[0] || {});
      const requiredFields = ["name", "email", "phoneNumber"];

      const filteredFields = availableFields.filter((field) =>
        requiredFields.includes(field)
      );
      // Sanitize the phoneNumber field to keep only numbers
      const sanitizedData = data.map((item) => {
        if (item.hasOwnProperty("phoneNumber")) {
          // Replace any non-numeric characters with an empty string
          item.phoneNumber = item.phoneNumber.toString().replace(/\D/g, "");
        }
        return item;
      });
      console.log("sanitized>>>>>>> ", sanitizedData);
      setFileFields(filteredFields);
      if (filteredFields.length === requiredFields.length) {
        console.log("All required fields are present in the file data.");
        console.log("Available fields:", filteredFields);
        setNumberOfPeople(data.length);
      } else {
        console.log("Some required fields are missing in the file data.");
        console.log("Available fields:", filteredFields);
        setNumberOfPeople(data.length);
      }
    } catch (error) {
      console.error("Error parsing JSON file:", error);
    }
  };

  reader.readAsText(file);
};

// export const checkFileData = (
//   file,
//   setFileFields,
//   setNumberOfPeople,
//   setFileData
// ) => {
//   const reader = new FileReader();

//   reader.onload = (event) => {
//     const content = event.target.result;
//     try {
//       const data = JSON.parse(content);
//       console.log(data);
//       setFileData(data);

//       const availableFields = Object.keys(data[0] || {});
//       const requiredFields = ["name", "email", "phoneNumber"];

//       const filteredFields = availableFields.filter((field) =>
//         requiredFields.includes(field)
//       );
//       // Sanitize the phoneNumber field to keep only numbers
//       const sanitizedData = data.map((item) => {
//         if (item.hasOwnProperty("phoneNumber")) {
//           // Replace any non-numeric characters with an empty string
//           item.phoneNumber = item.phoneNumber.toString().replace(/\D/g, "");
//         }
//         return item;
//       });
//       console.log("sanitized>>>>>>> ", sanitizedData);
//       setFileFields(filteredFields);
//       if (filteredFields.length === requiredFields.length) {
//         console.log("All required fields are present in the file data.");
//         console.log("Available fields:", filteredFields);
//         setNumberOfPeople(data.length);
//       } else {
//         console.log("Some required fields are missing in the file data.");
//         console.log("Available fields:", filteredFields);
//         setNumberOfPeople(data.length);
//       }
//     } catch (error) {
//       console.error("Error parsing JSON file:", error);
//     }
//   };

//   reader.readAsText(file);
// };
