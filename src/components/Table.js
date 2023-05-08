import React from 'react'

const Table = ({ orders = [], setOrders, isUserOrders = false }) => {


    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Customer Name
                    </th>
                    <th>
                        Location
                    </th>
                    <th>
                        Receipt
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Quantity
                    </th>
                    {
                        isUserOrders ? <th>
                            Settings
                        </th> : <></>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((order) => {
                        const handleConfirm = (e) => {
                            e.preventDefault()
                        }
                        return (
                            <tr>
                                <td>{order.customerName}</td>
                                <td>{order.location}</td>
                                <td>{order.receipt}</td>
                                <td>{order.price}</td>
                                <td>{order.quantity}</td>
                                {
                                    isUserOrders ? <th>

                                        <button>
                                            Delete
                                        </button>
                                        <form action={handleConfirm}>
                                            <input type="file" name="file" />

                                        </form>
                                    </th> : <></>
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Table