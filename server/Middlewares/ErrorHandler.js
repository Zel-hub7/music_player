const constants = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || constants.SERVER_ERROR;
  const errorResponse = {
    title: "",
    message: err.message,
    stackTrace: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      errorResponse.title = "Validation Failed";
      break;
    case constants.NOT_FOUND:
      errorResponse.title = "Not Found";
      break;
    case constants.FORBIDDEN:
      errorResponse.title = "Forbidden";
      break;
    case constants.UNAUTHORIZED:
      errorResponse.title = "Unauthorized";
      break;
    case constants.SERVER_ERROR:
      errorResponse.title = "Server Error";
      break;
    default:
      console.log("No Error");
      break;
  }

  res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;
