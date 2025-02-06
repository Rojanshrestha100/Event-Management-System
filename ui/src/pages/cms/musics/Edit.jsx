import { useEffect, useState } from "react"
import { setInForm } from "../../../lib"
import http from "../../../http"
import { useNavigate, useParams } from "react-router-dom"

const Edit = () => {
    const [form, setForm] = useState({status: 'Draft'})
    const [mimg, setMimg] = useState(null)
    const [upImg, setUpImg] = useState(null)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        http.get(`/cms/musics/${params.id}`)
            .then(({ data }) => {
                setForm({
                    mcontactinfo: data.mcontactinfo,
                    content: data.content,
                })
                
                if(data.mimg) {
                    setUpImg(`${import.meta.env.VITE_API_URL}/images/${data.mimg}`)
                }
            })
            .catch(err => { })

    }, [])

    const handleSubmit = ev => {
        ev.preventDefault()

        let formData = new FormData

        for(let k in form) {
            formData.append(k, form[k])
        }


        formData.append('file', mimg)

        http.patch(`/cms/musics/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(resp => navigate('/cms/musics'))
            .catch(err => console.log(err))
    }

    return <div className="row">
        <div className="col-12 my-3 bg-white py-3">
            <div className="row">
                <div className="col-5 mx-auto">
                    <h1>Edit Music</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-5 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Music Contactinfo</label>
                            <input type="text" name="mcontactinfo" id="mcontactinfo" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} defaultValue={form.mcontactinfo} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Content</label>
                            <textarea name="content" id="content" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} defaultValue={form.content} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">Image</label>
                            <input type="file" name="file" id="file" className="form-control" onChange={ev => {
                                setMimg(ev.target.files[0])
                            }} />
                            <div className="mt-3">{
                                mimg ? <img className="img-fluid" src={URL.createObjectURL(mimg)} /> : null
                            }</div>
                            <div className="mt-3">{
                                upImg ? <img className="img-fluid" src={upImg} /> : null
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

export default Edit