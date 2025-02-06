import { useEffect, useState } from "react"
import { setInForm } from "../../../lib"
import http from "../../../http"
import { useNavigate } from "react-router-dom"

const Create = () => {
    const [form, setForm] = useState({status: 'Draft'})
    const [categories, setCategories] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        http.get('/cms/categories')
            .then(({data}) => setCategories(data))
            .catch(err => {})
    }, [categories])

    const handleSubmit = ev => {
        ev.preventDefault()

        let formData = new FormData()

        for(let k in form) {
            formData.append(k, form[k]);
        }
        const menuitems = form.menuitems;
        const categoryId = form.categoryId;
        
        const body = {
            menuitems,categoryId
        }

        // for (var pair of formData.entries()) {
        //     console.log("Prg ",pair[0]+ ', ' + pair[1]);
        // }

        console.log("The body items are: ",body);
        http.post('/cms/menus', body)
            .then(resp => navigate('/cms/menus'))
            .catch(err => {})
    }

    

    return <div className="row">
        <div className="col-12 my-3 bg-white py-3">
            <div className="row">
                <div className="col-5 mx-auto">
                    <h1>Add In Menu</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-5 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="categoryId" className="form-label">Category</label>
                            <select name="categoryId" id="categoryId" className="form-select" required onChange={ev => setInForm(ev, form, setForm)}>
                                <option value="">Select a category</option>
                                {categories.map(category => <option value={category._id}>{category.categoryname}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Menu Item</label>
                            <input type="text" name="menuitems" id="name" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} />
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