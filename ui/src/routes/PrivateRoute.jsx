import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearStorage, fromStorage } from "../lib"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import http from "../http"
import { addAdmin } from "../state"

const PrivateRoute = ({element}) => {
    const admin = useSelector(state => state.admin.value)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(Object.keys(admin).length == 0) {
            const token = fromStorage('admin_token')

            if(token) {
                http.get('/cms/admins/detail')
                    .then(({data}) => {
                        dispatch(addAdmin(data))
                    })
                    .catch(err => {
                        toast.error('Please login to continue.')
                        clearStorage('admin_token')
                        navigate('/cms/login')
                    })
            } else {
                toast.error('Please login to continue.')
                navigate('/cms/login')
            }
        }
    }, [admin])

    return element
}

export default PrivateRoute