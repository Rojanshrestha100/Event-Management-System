import { useEffect, useState } from "react"
import http from "../../../http"
import { Link } from "react-router-dom"

const List = () => {
    const [catreens, setCatreens] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => http.get('/cms/catreens')
        .then(({ data }) => setCatreens(data))
        .catch(err => { })

    const handleDelete = id => {
        if(confirm('Are you sure you want to delete this item?')) {
            http.delete(`/cms/catreens/${id}`)
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
                    <h1>Catreens</h1>
                </div>
                <div className="col-auto">
                    <Link to="/cms/catreens/create" className="btn btn-primary">
                        <i className="fa-solid fa-plus me-2"></i>Add Catreen
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {catreens.length ? 
                        <table className="table table-bordered table-striped table-hover table-sm">
                            <thead className="table-primary">
                                <tr>
                                    <th>Catreen Contactinfo</th>
                                    <th>Content</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {catreens.map(catreen => <tr>
                                    <td>{catreen.ccontactinfo}</td>
                                    <td>{catreen.content}</td>
                                    <td>
                                        {catreen.cimg.length ? <img src={`${import.meta.env.VITE_API_URL}/images/${catreen.cimg}`} className="img-sm" /> : null}
                                    </td>
                                    <td>
                                        <Link to={`/cms/catreens/edit/${catreen._id}`} className="btn btn-success btn-sm">
                                            <i className="fa-solid fa-edit me-2"></i>Edit
                                        </Link>
                                        <button type="button" className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(catreen._id)}>
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