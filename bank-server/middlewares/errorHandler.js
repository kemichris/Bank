const errorHandler = (err, req, res, next) => {
    console.error('❌ ERROR');
    console.error('Method:', req.method);
    console.error('URL:', req.originalUrl);
    console.error('Message:', err.message);
    console.error('Stack:', err.stack);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        errors: err.errors || []
    });
};

export default errorHandler;