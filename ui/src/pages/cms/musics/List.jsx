import { useEffect, useState } from "react"
import http from "../../../http"
import { Link } from "react-router-dom"

const List = () => {
    const [musics, setMusics] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => http.get('/cms/musics')
        .then(({ data }) => setMusics(data))
        .catch(err => { })

    const handleDelete = id => {
        if(confirm('Are you sure you want to delete this item?')) {
            http.delete(`/cms/musics/${id}`)
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
                    <h1>Musics</h1>
                </div>
                <div className="col-auto">
                    <Link to="/cms/musics/create" className="btn btn-primary">
                        <i className="fa-solid fa-plus me-2"></i>Add Musics
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {musics.length ? 
                        <table className="table table-bordered table-striped table-hover table-sm">
                            <thead className="table-primary">
                                <tr>
                                    <th>Musics Contactinfo</th>
                                    <th>Content</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {musics.map(music => <tr>
                                    <td>{music.mcontactinfo}</td>
                                    <td>{music.content}</td>
                                    <td>
                                        {music.mimg.length ? <img src={`${import.meta.env.VITE_API_URL}/images/${music.mimg}`} className="img-sm" /> : null}
                                    </td>
                                    <td>
                                        <Link to={`/cms/musics/edit/${music._id}`} className="btn btn-success btn-sm">
                                            <i className="fa-solid fa-edit me-2"></i>Edit
                                        </Link>
                                        <button type="button" className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(music._id)}>
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