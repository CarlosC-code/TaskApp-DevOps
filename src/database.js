const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data", { recursive: true });
}

const db = new sqlite3.Database("./data/tasks.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed INTEGER DEFAULT 0
        )
    `);
});

module.exports = db;