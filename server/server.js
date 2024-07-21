import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import invoiceRoutes from "./routes/invoiceRoute.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

/**dotenv config */
dotenv.config();
const PORT = process.env.PORT;

/**db config */
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**cors */
app.use(cors());


/** router config from sub routers*/
app.use('/invoice', invoiceRoutes);

app.get("/", (req, res) => {
    return res.status(200).json({
        message: `API IS RUNNING SUCCESSFULLY...`
    });
});

app.listen(PORT, () => {
    console.log(`SERVER STARTED: ${PORT}`.bold.yellow);
})

