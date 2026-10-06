import Tenant from "../models/Tenant.js";
import getTenantConnection from "../database/tenantConnection.js";

const createTenant = async (organization) => {
  const existingTenant = await Tenant.findOne({
    organizationId: organization._id,
  });

  if (existingTenant) {
    return existingTenant;
  }

  const tenant = await Tenant.create({
    organizationId: organization._id,
    databaseName: organization.databaseName,
    databaseUri: `mongodb://127.0.0.1:27017/${organization.databaseName}`,
  });

  return tenant;
};

export { createTenant };