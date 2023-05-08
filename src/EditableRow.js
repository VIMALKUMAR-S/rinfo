import React, { useState } from 'react';

import './EditableRow.css';
import axios from './api/axios';

const EditableRow = ({ items, index, handleCancelClickChange, setEditClick }) => {

    // const [dishEditName, setDishEditName] = useState(items.dishName);
    // const [dishEditCategory, setDishEditCategory] = useState(items.category);
    // const [dishEditPrice, setEditPrice] = useState(items.price);
    // const [dishEditAvailability, setDishEditAvailability] = useState(items.availability);
    // const [dishEditImageUrl, setDishEditImageUrl] = useState(items.image_url);

    const [order, setOrder] = useState({
        name: items.customerName,
        location: items.location,
        receipt: items.receipt,
        price: items.price,
        quantity: items.quantity

    })
    const handleEditFormSubmit = () => {
        setEditClick(null)
        // axios.patch(
        //     `http://localhost:3500/food_items/${items.id}`,
        //     {
        //         "id": items.id,
        //         "dishName": dishEditName,
        //         "image_url": dishEditImageUrl,
        //         "category": dishEditCategory,
        //         "price": parseInt(dishEditPrice),
        //         "availability": dishEditAvailability,


        //     },
        //     {
        //         headers: {
        //             'Content-Type': 'application/json'

        //         }
        //     }
        // ).then((response) => {
        //     console.log(response.data);
        //     setEditClick(null);

        // }).catch((error) => {
        //     console.log(error);
        // })
        axios.post(
            'update-order',
            {

            }
        ).then((res) => {
            console.log(res)
        })
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

    return (

        <tr id='edit_admin_table_row'>
            <td id='edit_admin_table_cell' className='index_table'>{index + 1}</td>

            <td id='edit_admin_table_cell'>

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
            </td>
            <td>
                <input
                    id='input_field'
                    type='text'
                    name='orderLocation'
                    placeholder='ENTER LOCATION'
                    onChange={(e) => { handleInputChange(e) }}
                    value={order.orderLocation}
                    required
                />
            </td>

            {/* <td id='edit_admin_table_cell'>

                <input
                    id='input_field'
                    type='text'
                    name='customerEmail'
                    placeholder='ENTER CUSTOMER EMAIL'
                    onChange={(e) => { handleInputChange(e) }}
                    value={order.customerEmail}
                    required
                />

            </td > */}
            {/* <td id='edit_admin_table_cell'>

                <input
                    id='input_field'
                    type='text'
                    name='customerPhone'
                    placeholder='ENTER CUSTOMER PHONE NUMBER'
                    onChange={(e) => { handleInputChange(e) }}
                    value={order.customerPhone}
                    required
                />

            </td> */}
            <td>
                <input
                    id='input_field'
                    type='text'
                    name='orderReceipt'
                    placeholder='ENTER Receipt'
                    onChange={(e) => { handleInputChange(e) }}
                    value={order.orderReceipt}
                    required
                />

            </td>
            <td>
                <input
                    id='input_field'
                    type='text'
                    name='orderPrice'
                    placeholder='ENTER PRICE'
                    onChange={(e) => { handleInputChange(e) }}
                    value={order.orderPrice}
                    required
                />

            </td>
            <td id='edit_admin_table_cell'>

                <input
                    id='input_field'
                    type='text'
                    name='orderQuantity'
                    placeholder='ENTER QUANTITY'
                    onChange={(e) => { handleInputChange(e) }}
                    value={order.orderQuantity}
                    required
                />
            </td>



            <td id='edit_admin_table_cell'>
                <button
                    type='submit'
                    id='button_save'
                    onClick={() => { handleEditFormSubmit() }}>
                    SAVE

                </button>
                <button
                    type='button'
                    id='button_cancel'
                    onClick={handleCancelClickChange}>
                    CANCEL
                </button>
            </td>
        </tr>

    )
}

export default EditableRow