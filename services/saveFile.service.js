const fs = require("fs");

const saveFile = (csvData, filePath = "partners.csv") => {
  fs.writeFileSync(filePath, csvData, "utf8");
  console.log(`CSV file saved: ${filePath}`);
};

module.exports = { saveFile };
