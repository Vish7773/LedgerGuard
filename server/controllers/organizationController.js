import Organization from "../models/Organization.js";
import { sendResponse } from "../utils/response.js";

const createOrganization = async (req, res) => {
  const { name } = req.body;

  // Validate organization name
  if (!name) {
    return sendResponse(
      res,
      400,
      false,
      "Organization name is required"
    );
  }

  // Generate slug
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Check duplicate organization
  const existingOrganization = await Organization.findOne({
    slug,
  });

  if (existingOrganization) {
    return sendResponse(
      res,
      409,
      false,
      "Organization already exists"
    );
  }

  // Generate tenant database name
  const databaseName = `ledgerguard_tenant_${slug.replace(
    /-/g,
    "_"
  )}`;

  // Create organization
  const organization = await Organization.create({
    name,
    slug,
    databaseName,
  });

  return sendResponse(
    res,
    201,
    true,
    "Organization created successfully",
    organization
  );
};

export { createOrganization };