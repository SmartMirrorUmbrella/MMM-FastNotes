const { access, constants } = require("node:fs");
const NodeHelper = require("node_helper");
const sqlite3 = require('sqlite3');

module.exports = NodeHelper.create({

  socketNotificationReceived: function (notification, payload) {
    if (notification === "START_FAST_NOTES") {
      this.config = payload;
      this.todoListStart();
      setInterval(() => {
        this.readDb();
      }, this.config.updateInterval);
    } else if (notification === "DB-UPDATED") {
      this.readDb();
  }
  },

  todoListStart: function () {
    access('./modules/MMM-FastNotes/backend/database.db', constants.F_OK, (fileDoesNotExist) => {
      if (fileDoesNotExist) {
        let db = new sqlite3.Database('./modules/MMM-FastNotes/backend/database.db', (sql_err) => {
          if (sql_err) {
            console.error(sql_err.message)
          } else {
            db.run(`CREATE TABLE posts (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              content TEXT NOT NULL)`
            )
          }
        })
        db.close((sql_err) => {
          if (sql_err) {
            console.error(sql_err.message)
          }
        })
      }
    })
  },

  readDb: function () {
    let db = new sqlite3.Database('./modules/MMM-FastNotes/backend/database.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
    });

    let sql = `SELECT content Text,
                      created Date
               FROM posts
               ORDER BY created`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err);
      }
      this.sendSocketNotification("DATABASE", rows);
    });

    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
    });
  },
});