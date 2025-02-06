const mongoose= require("mongoose");
const PaymentModel= new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    payment_date: {
        type: Date,
        required: true,
    },
    orderId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'orders'
    },
    adminId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'admins'
    }
    
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
})

const Payment=new mongoose.model("payment",PaymentModel);
module.exports=Payment;