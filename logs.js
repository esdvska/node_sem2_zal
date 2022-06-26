const fs = require("fs");

const filename = "serverLogs.log";
const saveApiCallToLogs = (data) => {
  fs.appendFile(filename, data, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Logs saved");
  });
};

module.exports = saveApiCallToLogs;
