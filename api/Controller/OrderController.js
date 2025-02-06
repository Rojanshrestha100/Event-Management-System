const Order  = require('../Model/OrderSchema')
const { showError } = require('../Lib/index')
 
class OrdersController {
    index = async (req, res, next) => {
        try {
            const orders = await Order.aggregate([
                {$lookup: {from: 'venues', localField: 'venueId', foreignField: '_id', as: 'venue'}},
                {$lookup: {from: 'catreens', localField: 'catreenId', foreignField: '_id', as: 'catreen'}},
                {$lookup: {from: 'decorators', localField: 'decoratorsId', foreignField: '_id', as: 'decorator'}},
                {$lookup: {from: 'photographers', localField: 'photographerId', foreignField: '_id', as: 'photographer'}},
                {$lookup: {from: 'musics', localField: 'musicId', foreignField: '_id', as: 'music'}},
                {$lookup: {from: 'menu', localField: 'menuId', foreignField: '_id', as: 'menu'}},
                {$lookup: {from: 'customers', localField: 'customerId', foreignField: '_id', as: 'customer'}}
            ]).exec()

            res.json(orders)
        } catch(err) {
            showError(err, next)
        }

      
    }

    store = async (req, res, next) => {
        try {
            const data = req.body
            // console.log("USER IS: ", req.customer);

            // console.log("DATA IS: ", data);

            const existingOrder = await Order.findOne({
                order_date: data.venue.date,
                venueId: data.venue.id
            });
    
            if (existingOrder) {
                return res.status(400).json({
                    error: 'An order for this date and venue has already been placed.'
                });
            }
        
            const order = await Order.create({
                order_date: data.venue.date, venueId: data.venue.id, catreenId: data.catering.id, decoratorsId: data.decorators.id, photographerId: data.photographer.id, musicId: data.music.id, menuId: data.menu.id, customerId: req.customer._id
            })
            if(order){
                res.status(201).json({
                success: 'Order created.'
            })
            }
            
        } catch(err) {
            return res.json({message:err})
        }
    }

    show = async (req, res, next) => {
        try {
            const order = await Order.findById(req.params.id)
                .populate('venueId', 'vname')
                .populate('catreenId', 'ccontactinfo')
                .populate('decoratorsId', 'dcontactinfo')
                .populate('photographerId', 'pcontactinfo')
                .populate('musicId', 'mcontactinfo')
                .populate('customerId', 'cname')
                .populate({
                    path: 'menuId',
                    select: 'menuitems'
                });
    
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.json(order);
        } catch (err) {
            console.error("Error fetching order:", err); // Log the detailed error
            res.status(500).json({ error: 'Internal server error' });
        }
    };
      
    

    update = async (req, res, next) => {
        try {
            const { order_date, venueId, catreenId, decoratorsId, photographerId, musicId, menuId, customerId } = req.body
            
            await Order.findByIdAndUpdate(req.params.id, {
                order_date, venueId, catreenId, decoratorsId, photographerId, musicId, menuId, customerId
            })

            res.json({
                success: 'Order updated.'
            })
        } catch (err) {
            showError(err, next)
        }
    }
    
    destroy = async (req, res, next) => {
        
        try {
            
            await Order.findByIdAndDelete(req.params.id)

            res.json({
                success: 'Order removed.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
    
}

module.exports = new OrdersController