import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearStorage, fromStorage } from "../lib"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import http from "../http"
import { addCustomer } from "../state"

const PrivateRoute = ({element}) => {
    const customer = useSelector(state => state.customer.value)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(Object.keys(customer).length == 0) {
            const token = fromStorage('customer_token')

            if(token) {
                http.get('/cms/customers/detail')
                    .then(({data}) => {
                        dispatch(addCustomer(data))
                    })
                    .catch(err => {
                        toast.error('Please login to continue.')
                        clearStorage('customer_token')
                        navigate('/cms/login')
                    })
            } else {
                toast.error('Please login to continue.')
                navigate('/cms/login')
            }
        }
    }, [customer])

    return element
}

export default PrivateRoute