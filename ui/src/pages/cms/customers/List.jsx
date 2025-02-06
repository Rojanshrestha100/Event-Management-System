import { useEffect, useState } from "react"
import http from "../../../http"
import { Link, useLocation } from "react-router-dom"

const List = () => {
    const location = useLocation(); // Access the location object
    const newData = location.state?.newData;

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        http.get('/cms/customers')
            .then(({ data }) => setCustomers(data))
            .catch(err => { });
    };
    
        const handleDelete = id => {
            if(confirm('Are you sure you want to delete this item?')) {
                http.delete(`/cms/customers/${id}`)
                    .then(() => {
                        loadData();
                    })
                    .catch(err => {});
            }
        };

    return <div className="row">
        <div className="col-12 my-3 bg-white py-3">
            <div className="row">
                <div className="col">
                    <h1>Customers</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {customers.length ? 
                        <table className="table table-bcustomered table-striped table-hover table-sm">
                            <thead className="table-primary">
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Contact</th>
                                    <th>Address</th>
                                    <th>Useraname</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {customers.map(customer => <tr>
                                    <td>{customer.cname}</td>
                                    <td>{customer.contact}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.username}</td>
                                    <td>
                                    <button type="button" className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(customer._id)}>
                                                    <i className="fa-solid fa-trash me-2"></i>Delete
                                    </button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table> : 
                        <h4 className="text-muted fst-italic">No data added.</h4>}
                </div>
            </div>
        </div>
    </div>
}

export default List