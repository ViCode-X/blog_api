const logRequest = (req, res, next) => {
    const timestamp = new Date().toISOString();

    res.on('finish', () => {
        console.log(
            `[${timestamp}] ${req.method} - ${req.url} ${res.statusCode} from ${req.ip}`
        );
    });

    next();
};

module.exports = logRequest;