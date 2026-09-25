const express = require("express");

const documentRoutes = require("./routes/documentRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "CloudDocs API está funcionando"
    });
});

app.use("/api/documents", documentRoutes);

app.listen(PORT, () => {
    console.log(`CloudDocs API rodando em http://localhost:${PORT}`);
});                             