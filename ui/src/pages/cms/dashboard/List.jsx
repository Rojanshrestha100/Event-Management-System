import { useEffect, useState } from 'react';
import http from '../../../http';
import { Link } from 'react-router-dom';

const List = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const getMenuById = async (id) => {
        try {
            const res = await http.get(`/cms/menus/${id}`);
            return res.data.menuitems;
        } catch (err) {
            console.error(`Error fetching menu with id ${id}:`, err);
            setError('Error fetching menu data');
            return [];
        }
    };

    const loadData = async () => {
        try {
            const { data } = await http.get('/cms/orders');
            const ordersWithMenus = await Promise.all(data.map(async (order) => {
                const menuItems = await Promise.all(order.menuId.map(getMenuById));
                return { ...order, menuItems: menuItems.flat() };
            }));
            setOrders(ordersWithMenus);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Error fetching orders');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                await http.delete(`/cms/orders/${id}`);
                loadData();
            } catch (err) {
                console.error('Error deleting order:', err);
            }
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="row">
            <div className="col-12 my-3 bg-white py-3">
                <div className="row">
                    <div className="col">
                        <h1>Orders</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {orders.length ? (
                            <table className="table table-bordered table-striped table-hover table-sm">
                                <thead className="table-primary">
                                    <tr>
                                        <th>Order Date</th>
                                        <th>Venue</th>
                                        <th>Catreen</th>
                                        <th>Decorator</th>
                                        <th>Photographers</th>
                                        <th>Music</th>
                                        <th>Menu</th>
                                        <th>Customer</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                            <td>{order.order_date.split("T")[0]}</td>
                                            <td>{order.venue.length ? order.venue[0].vname : 'N/A'}</td>
                                            <td>{order.catreen.length ? order.catreen[0].ccontactinfo : 'N/A'}</td>
                                            <td>{order.decorator.length ? order.decorator[0].dcontactinfo : 'N/A'}</td>
                                            <td>{order.photographer.length ? order.photographer[0].pcontactinfo : 'N/A'}</td>
                                            <td>{order.music.length ? order.music[0].mcontactinfo : 'N/A'}</td>
                                            <td>{order.menuItems.length ? order.menuItems.join(", ") : 'N/A'}</td>
                                            <td>{order.customer.length ? order.customer[0].cname : 'N/A'}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(order._id)}>
                                                    <i className="fa-solid fa-trash me-2"></i> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <h4 className="text-muted fst-italic">No data added.</h4>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
