import Tenant from "../models/Tenant.js";
import getTenantConnection from "../database/tenantConnection.js";
import getTenantInvoiceModel from "../database/tenantModelFactory.js";
import { sendResponse } from "../utils/response.js";

const createInvoice = async (req, res) => {
  const {
    organizationId,
    invoiceNumber,
    customerName,
    amount,
  } = req.body;

  if (
    !organizationId ||
    !invoiceNumber ||
    !customerName ||
    amount === undefined
  ) {
    return sendResponse(
      res,
      400,
      false,
      "organizationId, invoiceNumber, customerName and amount are required"
    );
  }

  const tenant = await Tenant.findOne({
    organizationId,
  });

  if (!tenant) {
    return sendResponse(
      res,
      404,
      false,
      "Tenant not found"
    );
  }

  const tenantConnection = await getTenantConnection(
    tenant.databaseUri
  );

  const Invoice = getTenantInvoiceModel(
    tenantConnection
  );

  const invoice = await Invoice.create({
    invoiceNumber,
    customerName,
    amount,
    organizationId,
  });

  return sendResponse(
    res,
    201,
    true,
    "Invoice created successfully",
    invoice
  );
};

const getInvoices = async (req, res) => {
  const { organizationId } = req.query;

  if (!organizationId) {
    return sendResponse(
      res,
      400,
      false,
      "organizationId is required"
    );
  }

  const tenant = await Tenant.findOne({
    organizationId,
  });

  if (!tenant) {
    return sendResponse(
      res,
      404,
      false,
      "Tenant not found"
    );
  }

  const tenantConnection = await getTenantConnection(
    tenant.databaseUri
  );

  const Invoice = getTenantInvoiceModel(
    tenantConnection
  );

  const invoices = await Invoice.find({
    organizationId,
  }).sort({ createdAt: -1 });

  return sendResponse(
    res,
    200,
    true,
    "Invoices fetched successfully",
    invoices
  );
};

export {
  createInvoice,
  getInvoices,
};