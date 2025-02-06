import { useEffect, useState } from "react"
import { setInForm } from "../../../lib"
import http from "../../../http"
import { useNavigate } from "react-router-dom"

const Create = () => {
    const [form, setForm] = useState({status: 'Draft'})
    const [dimg, setDimg] = useState(null)

    const navigate = useNavigate()
    // console.log(sessionStorage.getItem('admin_token'));
    const handleSubmit = ev => {
        ev.preventDefault()

        let formData = new FormData()

        for(let k in form) {
            formData.append(k, form[k]);
        }

        formData.append('file', dimg)

        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]);
        // }

        // console.log(sessionStorage.getItem('admin_token'));

        http.post('/cms/decorators', formData)
            .then(resp => navigate('/cms/decorators'))
            .catch(err => {})
    }

    return <div className="row">
        <div className="col-12 my-3 bg-white py-3">
            <div className="row">
                <div className="col-5 mx-auto">
                    <h1>Add Decorator</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-5 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Decorator Contactinfo</label>
                            <input type="number" name="dcontactinfo" id="dcontactinfo" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Content</label>
                            <textarea name="content" id="content" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">Image</label>
                            <input type="file" name="file" id="file" className="form-control" onChange={ev => {
                                setDimg(ev.target.files[0])
                            }} />
                            <div className="mt-3">{
                                dimg ? <img className="img-fluid" src={URL.createObjectURL(dimg)} /> : null
                            }</div>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">
                                <i className="fa-solid fa-save me-2"></i>Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default Create