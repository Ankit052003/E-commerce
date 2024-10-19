function errorHandler(err, req, res, next) {
  // Log the full error stack in development mode for debugging purposes
  const isDevelopment = process.env.NODE_ENV === "development";

  console.error("Error:", err);

  // Choose the error status code (default to 500 if not provided)
  const statusCode = err.status || 500;

  // Prepare the error response
  const errorResponse = {
    status: false,
    message: statusCode === 500 ? "Internal Server Error" : err.message,
  };

  // In development, provide more detailed error information
  if (isDevelopment) {
    errorResponse.error = err.message; // Only expose detailed error messages in development
    errorResponse.stack = err.stack;   // Include the stack trace for debugging
  }

  res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;

  