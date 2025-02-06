import { useState } from "react";
import { setInForm } from "../../lib";
import http from "../../http";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [form, setForm] = useState({ status: 'Draft' });
    const navigate = useNavigate();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const formData = new FormData();

        for (let key in form) {
            formData.append(key, form[key]);
        }

        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]);
        // }

        // console.log(form)

        // try {
        //     const res = await http.post('/register', formData, {
        //         headers: {
        //             "Content-Type": "multipart/form-data"
        //         }
        //     });

        //     if (res.status === 201) {
        //         navigate('/cms/login');
        //     }
        // } catch (err) {
        //     console.log(err);
        // }

        http.post('/register', form)
        .then(resp => navigate('/cms/login'))
        .catch(err => {})
}


    return (
        <div className="row bs-gutter-y: 0;">
            <div className="col-3 my-5 mx-auto py-3 bg-white">
                <div className="row">
                    <div className="col text-center">
                        <h1>Register</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="cname" className="form-label">Fullname</label>
                                <input type="text" name="cname" id="cname" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contact" className="form-label">Contact</label>
                                <input type="number" name="contact" id="contact" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" name="address" id="address" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" name="username" id="username" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name="password" id="password" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} />
                            </div>
                            <div className="mb-3 d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
