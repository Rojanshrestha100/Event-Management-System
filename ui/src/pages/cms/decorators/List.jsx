import { useEffect, useState } from "react"
import http from "../../../http"
import { Link } from "react-router-dom"

const List = () => {
    const [decorators, setDecorators] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => http.get('/cms/decorators')
        .then(({ data }) => setDecorators(data))
        .catch(err => { })

    const handleDelete = id => {
        if(confirm('Are you sure you want to delete this item?')) {
            http.delete(`/cms/decorators/${id}`)
                .then(() => {
                    loadData()
                })
                .catch(err => {})
        }
    }

    return <div className="row">
        <div className="col-12 my-3 bg-white py-3">
            <div className="row">
                <div className="col">
                    <h1>Decorators</h1>
                </div>
                <div className="col-auto">
                    <Link to="/cms/decorators/create" className="btn btn-primary">
                        <i className="fa-solid fa-plus me-2"></i>Add Decorators
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {decorators.length ? 
                        <table className="table table-bordered table-striped table-hover table-sm">
                            <thead className="table-primary">
                                <tr>
                                    <th>Decorators Contactinfo</th>
                                    <th>Content</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {decorators.map(decorator => <tr>
                                    <td>{decorator.dcontactinfo}</td>
                                    <td>{decorator.content}</td>
                                    <td>
                                        {decorator.dimg.length ? <img src={`${import.meta.env.VITE_API_URL}/images/${decorator.dimg}`} className="img-sm" /> : null}
                                    </td>
                                    <td>
                                        <Link to={`/cms/decorators/edit/${decorator._id}`} className="btn btn-success btn-sm">
                                            <i className="fa-solid fa-edit me-2"></i>Edit
                                        </Link>
                                        <button type="button" className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(decorator._id)}>
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