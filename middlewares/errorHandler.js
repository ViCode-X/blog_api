const errorhandler = (err, req, res, next) => {
    console.error(err.message);
    console.error(err.stack || "");
    const status = err.status || 500;
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message
    });
};

module.exports = errorhandler;