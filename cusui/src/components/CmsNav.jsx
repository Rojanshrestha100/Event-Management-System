import React from 'react';
import { clearStorage } from "../lib"
import { useDispatch, useSelector } from "react-redux"
import { clearCustomer } from "../state"

const CmsNav = () => {
    const customer = useSelector((state) => state.customer.value);

    const dispatch = useDispatch()

    const logout = () => {
        clearStorage('customer_token')
        dispatch(clearCustomer())
    }

  return Object.keys(customer).length ? (
    <nav className='flex justify-between items-center p-3 w-full bg-blue-400'>
        <div>
            <h2>Event Management System</h2>
        </div>

        <div className='flex items-center'>
            <div>
            <ul className='flex gap-3 items-center'>
                <li><a className='text-black' style={{
                    textDecoration: 'none'
                }} href="#venue">Venue</a></li>
                <li><a className='text-black' style={{
                    textDecoration: 'none'
                }} href="#catreen">Catreen</a></li>
                <li><a className='text-black' style={{
                    textDecoration: 'none'
                }} href="#decorator">Decorators</a></li>
                <li><a className='text-black' style={{
                    textDecoration: 'none'
                }} href="#photographer">Photographers</a></li>
                <li><a className='text-black' style={{
                    textDecoration: 'none'
                }} href="#music">Musics</a></li>
                <li><a className='text-black' style={{
                    textDecoration: 'none'
                }} href="#menu">Menu</a></li>
            </ul>
            </div>
            <div className='flex items-center'>
                <ul><li><a className='text-black cursor-pointer'  onClick={logout}>Logout</a></li></ul>
            </div>
        </div>
    </nav>
  ) : (
    null
  )
}

export default CmsNav;
