const Customer  = require('../Model/CustomerSchema')
const { showError } = require('../Lib/index')
const bcrypt = require('bcryptjs')
const { format } = require('path')

class CustomersCtrl {
    index = async(req, res, next) => {
        try{
          const customers = await Customer.find()

          res.json(customers)
        }
        catch(err){
            showError(err, next)
        }
    }

    store = async (req, res, next) => {
        try {
            const { cname, contact, address, username, password } = req.body;
    
            // console.log(req.body); 
    
            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            const pg = await Customer.findOne({ contact });
            const regex = /^98\d{8}$/;
    
            if (pg) {
                throw new Error("Customer already exists.");
            }
    
            if (!regex.test(contact)) {
                throw new Error('Invalid contact format! Cannot save in the database!');
            }
    
            await Customer.create({
                cname,
                contact,
                address,
                username,
                password: hash
            });
    
            // Respond with success message
            res.status(201).json({
                success: 'Customer created.'
            });
        } catch (err) {
            showError(err, next);
        }
    }

    show = async(req, res, next) => {
        try{
            const customer = await Customer.findById(req.params.id)

            res.json(customer)
        }
        catch(err){
            showError(err, next)
        }
    }

    update = async(req, res, next) => {
        try{
            const { cname, contact, address, username, password } = req.body
            const customer = await Customer.findById(req.params.id);
            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

            if (!customer) {
                return res.status(404).json({ message: "Customer not found." });
            }

            const regex = /^98\d{8}$/;

            if (!(regex.test(contact))) {
                throw new Error('Invalid contact format! Cannot update in the database!');
            }

            await Customer.findByIdAndUpdate(req.params.id, {
                cname, contact, address, username, password: hash
            })

            res.status(201).json({
                sucess: 'Customer updated.'
            })
        }
        catch(err){
            showError(err, next)
        }
    }


    destroy = async(req, res, next) => {
        try{
            await Customer.findByIdAndDelete(req.params.id)

            res.status(201).json({
                sucess: 'Customer deleted.'
            })
        }
        catch(err){
            showError(err, next)
        }
    }
}

module.exports = new CustomersCtrl