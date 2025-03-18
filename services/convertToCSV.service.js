const { parse } = require("json2csv");

const convertToCSV = (data) => {
  if (!data.length) {
    console.error("No data available to convert.");
    return null;
  }

  const fields = Object.keys(data[0]); 
  const opts = { fields };

  try {
    return parse(data, opts);
  } catch (err) {
    console.error("Error converting to CSV:", err);
    return null;
  }
};

module.exports = { convertToCSV };
