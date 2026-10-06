import mongoose from "mongoose";

const tenantConnections = new Map();

const getTenantConnection = async (databaseUri) => {
  if (!databaseUri) {
    throw new Error("Tenant database URI is required");
  }

  // Reuse existing connection
  if (tenantConnections.has(databaseUri)) {
    const existingConnection = tenantConnections.get(databaseUri);

    if (existingConnection.readyState === 1) {
      return existingConnection;
    }
  }

  // Create new tenant connection
  const connection = await mongoose.createConnection(databaseUri).asPromise();

  console.log(`✅ Tenant database connected: ${databaseUri}`);

  tenantConnections.set(databaseUri, connection);

  return connection;
};

export default getTenantConnection;