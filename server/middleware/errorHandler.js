import { sendResponse } from "../utils/response.js";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  sendResponse(
    res,
    err.statusCode || 500,
    false,
    err.message || "Internal Server Error"
  );
};

export default errorHandler;