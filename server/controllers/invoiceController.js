import invoiceModel from "../models/invoiceModel.js";

/**
 * input: req
 * output: res
 * methods: post
 * path: /innvoiceCreate
 */
export const innvoiceCreate = async (req, res) => {
  try {
    const { billTo, shipTo, date, items, totalAmount } = req.body;

    /**create new invoice to db */
    const newInvoice = new invoiceModel({
      billTo,
      shipTo,
      date,
      items,
      totalAmount,
    })

    const savedInvoice = await newInvoice.save();
    return res.status(200).json({
        status: true,
        message: "created successfuly...",
        data: savedInvoice
    })
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
