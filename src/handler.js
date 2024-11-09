const baseUrlHandler = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Sentivue backend APIs endpoint, please /login or /register first to use the APIs',
        version: 'tags/v1.0.0'
    });
};

const missingUrlHandler = (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found',
        version: 'tags/v1.0.0'
    });
};

module.exports = { baseUrlHandler, missingUrlHandler };