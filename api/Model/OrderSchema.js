const mongoose = require("mongoose");
const OrderModel = new mongoose.Schema({
    order_date: {
        type: Date,
        required: true,
    },
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'venues'
    },
    catreenId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'catreens'
    },
    decoratorsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'decorators'
    },
    photographerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'photographers'
    },
    musicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'musics'
    },
    menuId: {
        type: [mongoose.Schema.Types.ObjectId], // Ensure it's an array of ObjectIds
        required: true,
        ref: 'menus'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'customers'
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
});

const Order = mongoose.model("order", OrderModel);
module.exports = Order;
