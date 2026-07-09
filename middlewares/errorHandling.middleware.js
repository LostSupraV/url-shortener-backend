// middlewares/error.middleware.js

const errorHandler = (err, req, res, next) => {

    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // ==========================
    // Mongoose Errors
    // ==========================

    // Invalid ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid resource ID.";
    }

    // Schema Validation
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map(error => error.message)
            .join(", ");
    }

    // Duplicate Key
    if (err.code === 11000) {
        statusCode = 409;

        const field = Object.keys(err.keyValue)[0];

        message = `${field} already exists.`;
    }

    // ==========================
    // JWT Errors
    // ==========================

    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token.";
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token has expired.";
    }

    // ==========================
    // Multer Errors
    // ==========================

    if (err.name === "MulterError") {

        statusCode = 400;

        switch (err.code) {

            case "LIMIT_FILE_SIZE":
                message = "File size exceeds limit.";
                break;

            case "LIMIT_FILE_COUNT":
                message = "Too many files uploaded.";
                break;

            case "LIMIT_UNEXPECTED_FILE":
                message = "Unexpected file uploaded.";
                break;

            default:
                message = err.message;

        }

    }

    // ==========================
    // Syntax Errors (Bad JSON)
    // ==========================

    if (
        err instanceof SyntaxError &&
        err.status === 400 &&
        "body" in err
    ) {
        statusCode = 400;
        message = "Malformed JSON request.";
    }

    // ==========================
    // Axios Errors
    // ==========================

    if (err.isAxiosError) {

        statusCode = err.response?.status || 500;

        message =
            err.response?.data?.message ||
            "External API request failed.";

    }

    // ==========================
    // Permission Errors
    // ==========================

    if (err.code === "EACCES") {
        statusCode = 403;
        message = "Permission denied.";
    }

    // ==========================
    // File System Errors
    // ==========================

    if (err.code === "ENOENT") {
        statusCode = 404;
        message = "Requested file not found.";
    }

    // ==========================
    // MongoDB Connection Errors
    // ==========================

    if (err.name === "MongoNetworkError") {
        statusCode = 503;
        message = "Database connection failed.";
    }

    // ==========================
    // Rate Limiter
    // ==========================

    if (err.status === 429) {
        statusCode = 429;
        message = "Too many requests.";
    }

    // ==========================
    // Better Auth / Authentication
    // ==========================

    if (err.name === "UnauthorizedError") {
        statusCode = 401;
        message = "Authentication required.";
    }

    // ==========================
    // Default Response
    // ==========================

    res.status(statusCode).json({

        success: false,

        message,

        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : undefined

    });

};

export default errorHandler;