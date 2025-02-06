import { useDispatch, useSelector } from "react-redux"
import { clearStorage } from "../lib"
import { clearAdmin } from "../state"
import { Link } from "react-router-dom"

const CmsNav = () => {

    const admin = useSelector(state => state.admin.value)

    const dispatch = useDispatch()

    const logout = () => {
        clearStorage('admin_token')
        dispatch(clearAdmin())
    }

    return Object.keys(admin).length ? 
    <div className="row">
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/cms/dashboard">Boudha Garden</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cms/venues">
                                Venues
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cms/catreens">
                                Catreens
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cms/decorators">
                                Decorators
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cms/photographers">
                                Photohraphers
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cms/musics">
                                Musics
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cms/menus">
                                Menu
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cms/orders">
                                Orders
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cms/customers">
                                Customers
                            </Link>
                        </li>
                    </ul>
                    <span class="navbar-text">
                        <i className="fa-solid fa-user-circle me-2"></i>{admin.name}
                    </span>
                    <ul className="navbar-nav mb-2 mb-lg-0 ms-3">
                        <li className="nav-item">
                            <button type="button" className="btn btn-link nav-link" onClick={logout}>
                                <i className="fa-solid fa-sign-out-alt me-2"></i>Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div> : null
}

export default CmsNav