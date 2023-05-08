import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import './styles/AdminPannel.css'

import TableRow from './TableRow'
import EditableRow from './EditableRow'
import { useRecoilState } from 'recoil'
import { allOrderState, userOrderState } from './atoms/order'
import axios from './api/axios'




function AdminPanel() {

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

    const navigate = useNavigate()
    const handleLogOut = () => {

        axios.post(

            'logout',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            }
        ).then(
            () => {
                console.log('logged out')
                localStorage.setItem('jwt', "");
                navigate('../login');
            }
        )
    }
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
            getAllOrders()
            getUserOrders()


        })
    }
    useEffect(() => {
        getAllOrders()
        getUserOrders()
    }, [])



    // const [foodItems, setFoodItems] = useState([{}]);

    // const [dishName, setDishName] = useState('');
    // const [dishCategory, setDishCategory] = useState('');
    // const [dishPrice, setPrice] = useState(null);
    // const [dishImageUrl, setDishImageUrl] = useState('');

    // const [editFoodItems, setEditFoodItems] = useState({
    //     "dishName": '',
    //     "price": parseInt(''),
    //     "category": '',
    //     "availability": true,
    //     "imageUrl": ''
    // });

    const [editClick, setEditClick] = useState(null);


    const handleEditClickChange = (event, Items) => {
        event.preventDefault();
        setEditClick(Items.id);

        // const new_field = {

        //     "id": foodItems.key,
        //     "dishName": foodItems.dishName,
        //     "price": foodItems.price,
        //     "availability": foodItems.availability,
        //     "category": foodItems.category,
        //     "image_url": foodItems.imageUrl

        // };

        // setEditFoodItems(new_field);

        // axios.patch(
        //     `http://localhost:3500/food_items/${foodItems.key}`,
        //     //'http://localhost:3500/books',
        //     JSON.stringify({

        //         "dishName": foodItems.dishName,
        //         "price": foodItems.price,
        //         "availability": foodItems.availability,
        //         "category": foodItems.category,
        //         "image_url": foodItems.imageUrl
        //     }),
        //     {
        //         // headers:{
        //         //     'Content-Type':'application/json'

        //         // }
        //     }
        // ).then((response) => {

        //     console.log(response.data);

        // }).catch((error) => {
        //     console.log(error);
        // })




    };

    const handleCancelClickChange = () => {
        setEditClick(null);
    };

    const handleRemoveClickChange = (id) => {

        // const new_Array = [...foodItems];
        // const index = foodItems.findIndex((foodItems) => foodItems.id === id);



        // axios.delete(
        //     `http://localhost:3500/food_items/${id}`,


        // ).then((response) => {
        //     console.log(response.data);
        //     new_Array.splice(index, 1);
        //     setFoodItems(new_Array);

        // }).catch((error) => {
        //     console.log(error);
        // })


    };



    return (
        <div className='Admin_Panel'>

            <div id='top'></div>

            <br></br>
            <br></br>


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
            <section className='button-wrapper'>
                <button
                    style={toggle ? { backgroundColor: "#25f53d" } : { backgroundColor: "#ffff" }}
                    disabled={toggle} onClick={() => setToggle(true)}>
                    Your orders
                </button>
                <button
                    style={!toggle ? { backgroundColor: "#25f53d" } : { backgroundColor: "#ffff" }}
                    disabled={!toggle} onClick={() => setToggle(false)} >
                    All Orders
                </button>
            </section>
            <br></br>
            <br></br>

            <table className='admin_table'>

                <thead className='admin_table_head'>

                    <tr>
                        <th id='admin_table_head'>
                            Customer Name
                        </th>
                        {
                            toggle ? <th>
                                Email

                            </th> : <></>
                        }
                        <th id='admin_table_head'>
                            Location
                        </th>
                        <th id='admin_table_head'>
                            Receipt
                        </th>
                        <th id='admin_table_head'>
                            Price
                        </th>
                        <th id='admin_table_head'>
                            Quantity
                        </th>
                        {
                            toggle ? <th>
                                Phone

                            </th> : <></>
                        }

                    </tr>

                </thead>

                <tbody>


                    {toggle ? userOrders.map((items, index) => (
                        <Fragment>

                            {/* {editClick === items.id ?
                                (<EditableRow
                                    items={items}
                                    index={index}
                                    handleCancelClickChange={handleCancelClickChange}
                                    setEditClick={setEditClick} />
                                ) : */}
                            (<TableRow
                                items={items}
                                index={index}
                                handleEditClickChange={handleEditClickChange}
                                handleRemoveClickChange={handleRemoveClickChange}
                                isUserTable={true}
                            />
                            )
                            {/* } */}

                        </Fragment>


                    )) : allOrders.map((items, index) => (
                        <Fragment>


                            <TableRow
                                items={items}
                                index={index}
                                handleEditClickChange={handleEditClickChange}
                                handleRemoveClickChange={handleRemoveClickChange}
                                isUserTable={false}
                            />



                        </Fragment>


                    ))}

                </tbody>

            </table>

        </div>
    )
}

export default AdminPanel;