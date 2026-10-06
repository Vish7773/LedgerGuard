import mongoose from "mongoose";
import invoiceSchema from "../models/Invoice.js";

const getTenantInvoiceModel = (tenantConnection) => {
  if (!tenantConnection) {
    throw new Error("Tenant connection is required");
  }

  if (tenantConnection.models.Invoice) {
    return tenantConnection.models.Invoice;
  }

  return tenantConnection.model("Invoice", invoiceSchema);
};

export default getTenantInvoiceModel;