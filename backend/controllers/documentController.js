const getDocuments = (req, res) => {
    const documents = [
        {
            id: 1,
            name: "documento-exemplo.pdf",
            type: "application/pdf"
        },
        {
            id: 2,
            name: "contrato-exemplo.pdf",
            type: "application/pdf"
        }
    ];

    res.json(documents);
};

module.exports = {
    getDocuments
};