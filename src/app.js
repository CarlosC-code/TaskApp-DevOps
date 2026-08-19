const express = require("express");
const path = require("path");
const db = require("./database");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

app.post("/api/tasks", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "El título es obligatorio"
        });
    }

    db.run(
        "INSERT INTO tasks (title) VALUES (?)",
        [title],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                id: this.lastID,
                title,
                completed: 0
            });
        }
    );
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK"
    });
});

if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
}

module.exports = app;