const { defineConfig } = require("cypress");
const mysql = require("mysql");

module.exports = defineConfig({
  watchForFileChanges: false,
  env: {
    db: {
      host: "sql10.freesqldatabase.com",
      user: "sql10749076",
      password: "nH2Stt4fJ6",
      database: "sql10749076",
      port: "3306"
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config);
        },
      });
    },
  },
});

function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db);
  connection.connect();
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        connection.end();
        return resolve(results);
      }
    });
  });
}