const axios = require("axios");
const moment = require("moment");

const fetchPartners = async (firstName, status) => {
  try {
    const API_URL = "https://api.feryrides.com/";

    const headers = {
      "x-api-key": "sswtyghxxxxxxxxxxxxxxxxxxxxxx",
      "Content-Type": "application/json",
    };

  
    const startOfMonth = Math.floor(moment().startOf("month").toDate().getTime() / 1000);
    const endOfMonth = Math.floor(moment().endOf("month").toDate().getTime() / 1000);

    const body = {
      query: `db.collection('Partners')
              .where('status', '==', '${status}')
              .where('firstName', '==', '${firstName}')
              .where('updatedAt._seconds', '>=', ${startOfMonth})
              .where('updatedAt._seconds', '<=', ${endOfMonth})
              .get()`,
    };

    const response = await axios.post(API_URL, body, { headers });

    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data.map((partner) => ({
        ...partner,
        dateOfJoining: partner.dateOfJoining
          ? moment.unix(partner.dateOfJoining._seconds).format("YYYY-MM-DD ")
          : null,
        updatedAt: partner.updatedAt
          ? moment.unix(partner.updatedAt._seconds).format("YYYY-MM-DD HH:mm:ss")
          : null,
      }));
    } else {
      console.log("No active partner data found!");
      return [];
    }
  } catch (error) {
    console.error("Error fetching active partners:", error.response?.data || error.message);
    return [];
  }
};


fetchPartners("kavita", "active").then((data) => console.log(data));

module.exports = { fetchPartners };
