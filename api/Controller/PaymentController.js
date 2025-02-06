const crypto=require("crypto");

const createSignature = (message) => {
    const secret = "8gBm/:&EnhH.1/q"; //different in production
    // Create an HMAC-SHA256 hash
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(message);

    // Get the digest in base64 format
    const hashInBase64 = hmac.digest("base64");
    return hashInBase64;
}; 




// const { formatDate, createSignature } = require('../lib');
// CREATE Payment
    const createPayment = async (req, res, next) => {
        try {
            const amount = req.body.amount;
            //const movie_id = data.movie_id;
            const uuid = performance.now();

            const id = `${uuid}`.replace(".", "-");

            const signature = createSignature(
                `total_amount=${amount},transaction_uuid=${id},product_code=EPAYTEST`
            );

            const formData = {
                amount: amount,
                failure_url: "http://localhost:5173/failure",
                product_delivery_charge: "0",
                product_service_charge: "0",
                product_code: "EPAYTEST",
                signature: signature,
                signed_field_names: "total_amount,transaction_uuid,product_code",
                success_url: 'http://localhost:5173/success',
                tax_amount: "0",
                total_amount: amount,
                transaction_uuid: id
            };

            return res.json({
                message: "Order Created",
                formData
            });
        } catch (err) {
            return res.status(400).json({
                message: err.message
            });
        }
    }

    module.exports={ createPayment }