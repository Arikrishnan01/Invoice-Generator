import express from "express";
import { innvoiceCreate } from "../controllers/invoiceController.js";

const router = express.Router();

/**sub routers for invoices */
router.post("/innvoiceCreate", innvoiceCreate);

const invoiceRoutes = router;
export default invoiceRoutes;