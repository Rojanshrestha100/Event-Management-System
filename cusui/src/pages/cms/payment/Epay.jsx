import React from 'react';
import axios from 'axios'; 

function Epay() {
    // const amt = new URLSearchParams(location.search).get('amount') || 0;
    const amt= 5000;

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const data = { amount: amt };
        console.log("Local Storage: ", localStorage.getItem("customer_token"));
        // console.log("Session Storage: ", sessionStorage.getItem("customer_token"));

        await axios.post('http://localhost:8000/cuscms/payments/payment', data, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("customer_token")}` }
        }).then(res => esewaCall(res.data.formData))
          .catch(err => console.log("Payment ERROR", err));
    };

    const esewaCall = (formData) => {
        console.log(formData);
        const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
        const form = document.createElement("form");
        form.method = "POST";
        form.action = path;

        Object.entries(formData).forEach(([key, value]) => {
            const hiddenField = document.createElement("input");
            hiddenField.type = "hidden";
            hiddenField.name = key;
            hiddenField.value = value;
            form.appendChild(hiddenField);
        });

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-black rounded bg-blue-300 p-8 shadow-lg">
                <h1 className="text-3xl font-bold mb-4">Payment</h1>
                <div className="mb-4">
                    <p className="text-lg">Total Amount: <span className="font-bold">{amt}</span></p>
                </div>
                <button 
    onClick={handleSubmit} 
    style={{
        backgroundColor: '#3498db',
        color: '#fff',
        fontWeight: 'bold',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    }}
>
    Continue to Payment
</button>
            </div>
        </div>
    );
}

export default Epay;

