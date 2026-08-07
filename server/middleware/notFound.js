import { sendResponse } from "../utils/response.js";

const notFound = (req, res) => {
  sendResponse(res, 404, false, `Route ${req.originalUrl} not found`);
};

export default notFound;