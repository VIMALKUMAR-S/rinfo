import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { tokenState } from './atoms/auth'
import { allOrderState, userOrderState } from './atoms/order'
import axios from './api/axios'
import { toast } from 'react-toastify'
import Table from './components/Table'

const Admin = () => {


    const [allOrders, setAllOrders] = useRecoilState(allOrderState)
    const [userOrders, setUserOrders] = useRecoilState(userOrderState)
    const [toggle, setToggle] = useState(false);
    const [order, setOrder] = useState(
        {
            "customerName": "",
            "customerEmail": "",
            "customerPhone": "",
            "orderQuantity": "",
            "orderLocation": "",
            "orderPrice": ""
        }
    )


    const getAllOrders = async () => {
        try {
            const response = await axios.get(
                '/get-all-orders',
                {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem('jwt')
                    }
                }
            )
            setAllOrders(response.data.data)
        }
        catch (err) {
            toast.error(err.msg)
        }
    }
    const getUserOrders = async () => {
        try {
            const response = await axios.get(
                '/get-current-user-orders',
                {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem('jwt')
                    }
                }
            )
            setUserOrders(response.data.data)
        }
        catch (err) {
            toast.error(err.msg)
        }
    }
    const handleInputChange = (e) => {

        const { name, value } = e.target
        setOrder(
            {
                ...order,
                [name]: value
            }
        )

    }
    const handleAddItem = (e) => {
        e.preventDefault()
        axios.post(
            'register-order',

            order
            ,
            {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('jwt')
                }
            }
        ).then((res) => {
            if (res.data.msg === "Order Registered") {
                console.log(res)
            }

        })
    }
    useEffect(() => {
        getAllOrders()
        getUserOrders()
    }, [])

    return (
        <>

            <section>
                <form onSubmit={handleAddItem} className='form_addfield'>
                    <input
                        id='input_field'
                        type='text'
                        name='customerName'
                        placeholder='ENTER CUSTOMER NAME'
                        autoComplete='off'
                        value={order.customerName}
                        onChange={(e) => { handleInputChange(e) }}
                        required

                    />
                    <input
                        id='input_field'
                        type='text'
                        name='customerEmail'
                        placeholder='ENTER CUSTOMER EMAIL'
                        onChange={(e) => { handleInputChange(e) }}
                        value={order.customerEmail}
                        required
                    />
                    <input
                        id='input_field'
                        type='text'
                        name='customerPhone'
                        placeholder='ENTER CUSTOMER PHONE NUMBER'
                        onChange={(e) => { handleInputChange(e) }}
                        value={order.customerPhone}
                        required
                    />
                    <input
                        id='input_field'
                        type='text'
                        name='orderQuantity'
                        placeholder='ENTER QUANTITY'
                        onChange={(e) => { handleInputChange(e) }}
                        value={order.orderQuantity}
                        required
                    />
                    <input
                        id='input_field'
                        type='text'
                        name='orderPrice'
                        placeholder='ENTER PRICE'
                        onChange={(e) => { handleInputChange(e) }}
                        value={order.orderPrice}
                        required
                    />
                    <input
                        id='input_field'
                        type='text'
                        name='orderLocation'
                        placeholder='ENTER LOCATION'
                        onChange={(e) => { handleInputChange(e) }}
                        value={order.orderLocation}
                        required
                    />




                    <button type='submit' id='button__add'>ADD</button>
                    <br></br>
                </form>
            </section>
            <section className='toggle-wrapper'>
                <button onClick={() => setToggle(!toggle)}>
                    All orders
                </button>
                <button onClick={() => setToggle(!toggle)}>
                    Your Orders
                </button>
            </section>
            <section className='table-container'>
                {
                    !toggle ? <Table orders={allOrders} setOrders={setAllOrders} isUserOrders={false} /> : <Table orders={userOrders} setOrders={setUserOrders} isUserOrders={true} />
                }

            </section>
        </>

    )
}

export default Admin