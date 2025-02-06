import { useEffect, useState } from "react";
import http from "../../../http";
import { Link, useLocation } from "react-router-dom";

const List = () => {
    const location = useLocation(); // Access the location object
    const newData = location.state?.newData; // Access the passed state

    const [menus, setMenus] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        http.get('/cms/menus')
            .then(({ data }) => setMenus(data))
            .catch(err => { });
    };

    const handleDelete = id => {
        if(confirm('Are you sure you want to delete this item?')) {
            http.delete(`/cms/menus/${id}`)
                .then(() => {
                    loadData();
                })
                .catch(err => {});
        }
    };

    return (
        <div className="row">
            <div className="col-12 my-3 bg-white py-3">
                <div className="row">
                    <div className="col">
                        <h1>Menus</h1>
                    </div>
                    <div className="col-auto">
                        <Link to="/cms/menus/create" className="btn btn-primary">
                            <i className="fa-solid fa-plus me-2"></i>Add Menu Item
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {menus.length ? (
                            <table className="table table-bordered table-striped table-hover table-sm">
                                <thead className="table-primary">
                                    <tr>
                                        <th>Category</th>
                                        <th>Menu Item</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menus.map(menu => (
                                        <tr key={menu._id}>
                                            <td>{menu.category[0].categoryname}</td>
                                            <td>{menu.menuitems}</td>
                                            <td>
                                                <Link to={`/cms/menus/edit/${menu._id}`} className="btn btn-success btn-sm">
                                                    <i className="fa-solid fa-edit me-2"></i>Edit
                                                </Link>
                                                <button type="button" className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(menu._id)}>
                                                    <i className="fa-solid fa-trash me-2"></i>Delete
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