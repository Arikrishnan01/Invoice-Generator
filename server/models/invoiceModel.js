import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    doorNumber: {
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    }
});

const invoiceSchema = new mongoose.Schema({
    billTo:{
        type: addressSchema,
        required: true
    },
    shipTo: {
        type: addressSchema,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    items:[{
        description: {
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount:{
        type: Number,
        required: true
    }
},{ timestamps: true });

export default mongoose.model("Invoice", invoiceSchema);
