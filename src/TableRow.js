import React, { useEffect, useState } from 'react'
import './TableRow.css'
import axios from './api/axios';
import { toast } from 'react-toastify';


const TableRow = ({ items, index, handleEditClickChange, handleRemoveClickChange, isUserTable }) => {


    // const [dishEditName, setDishEditName] = React.useState(items.dishName);
    // const [dishEditCategory, setDishEditCategory] = React.useState(items.category);
    // const [dishEditPrice, setEditPrice] = React.useState(items.price);
    // const [dishEditImageUrl, setDishEditImageUrl] = React.useState(items.image_url);
    // const [checkedBox, setCheckedBox] = React.useState(items.availability);
    const [image, setImage] = useState(null)
    const [confirmed, setConfirmed] = useState(false);

    const editChange = (event) => {
        handleEditClickChange(event, items);
    }

    const removeChange = () => {
        handleRemoveClickChange(items.id)
    }


    const handleSubmit = async (event) => {

        event.preventDefault()
        const formData = new FormData();

        const finalSend = {
            'orderId': items.id,
            "expenses": "100000"
        }
        formData.append('data', JSON.stringify(finalSend));

        formData.append('image', image);
        // formData.append();
        console.log(JSON.stringify(formData))
        axios.post(
            '/handle-order-completion',
            formData,
            {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("jwt")
                }
            }
        ).then(
            () => {

                setImage(null)
                setConfirmed(true)
                toast.success('Order Confirmed')
            }
        )


    }



    // console.log(index+1,checkedBox)

    return (

        <tr className='admin_table_row'>

            <td id='admin_table_cell'>{items.customerName}</td>
            {isUserTable ?
                <td id='admin_table_cell'>{items.email}</td> : <></>}
            <td id='admin_table_cell'>{items.location}</td>
            <td id='admin_table_cell'>{items.receipt}</td>
            <td id='admin_table_cell'>{items.price}</td>
            <td id='admin_table_cell'>{items.quantity}</td>
            {isUserTable ?
                <td id='admin_table_cell'>{items.phoneNumber}</td> : <></>}

            {/* <td id='admin_table_cell'>{index + 1}</td>

            <td id='admin_table_cell'>{items.customerName}</td>

            <td id='admin_table_cell'>{items.price}</td>

            <td id='admin_table_cell'>{items.category}</td> */}

            {/* <td id='admin_table_cell'>
                    <input 
                        id='input_field'
                        type='checkbox'
                        name='availability'
                        // checked={checkedBox}
                        onChange={checkChange}
                        
                    />
                    
                </td> */}



            {isUserTable ?
                <td id='admin_table_cell_actions'>
                    {confirmed ? <>Order Confirmed</> :
                        <form>
                            <label>
                                <input
                                    id='button_edit'
                                    type='file'
                                    onChange={(event) => {
                                        setImage(event.target.files[0])
                                        // handleSubmit(event)
                                    }}

                                />


                                Confirm Order

                            </label>
                            <button disabled={image === null} onClick={handleSubmit}>
                                Submit
                            </button>
                        </form>}

                    <button
                        id='button_remove'
                        type='button'
                        onClick={removeChange}>
                        REMOVE
                    </button>
                </td> : <></>}

        </tr>


    )
}

export default TableRow