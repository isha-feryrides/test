const { fetchPartners } = require("./services/fetchPartner.service");
const { convertToCSV } = require("./services/convertToCSV.service");
const { saveFile } = require("./services/saveFile.service");

const exportPartnersToCSV = async () => {
  try {
    console.log("Fetching partner data...");
    const partners = await fetchPartners();

    if (!partners.length) {
      console.log("No partner data found!");
      return;
    }

    console.log("Converting to CSV...");
    const csvData = convertToCSV(partners);

    if (csvData) {
      console.log("Saving CSV file...");
      saveFile(csvData);
    }
  } catch (error) {
    console.error(" Error exporting partners:", error);
  }
};

exportPartnersToCSV();
