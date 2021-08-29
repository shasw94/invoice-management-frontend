import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import Order from './Order';
const socket = io('http://localhost:5001');


const Subsciber = (props) => {

    const [orders, setOrder] = useState([]);
    const [errors, setError] = useState([]);
    const [noRecords, setNoRecords] = useState(false);
    const [successCount, setSuccessCount] = useState(0);
    const [errorCount, setErrorCount] = useState(0);

    useEffect(() => {
        socket.on('message', ({ type, order, count }) => {
            if (count === 0) {
                setNoRecords(true);
            }
            if (type === "success") {
                setOrder([...order, ...orders]);
                setSuccessCount(count);
                // console.log(order);
            }
            if (type === "error") {
                setError([...order, ...errors]);
                setErrorCount(count);
            }
        })
    }, []);

    const renderOrders = (orderArr, isSuccess) => {
        return orderArr.map((ord, index) => {
            return <Order order={ord.order} isSuccess={isSuccess} keys={index} />
        })
    }

    return (
        <div>
            {!noRecords && <div className="container-fluid">
                <div className="row">
                    {orders.length > 0 ? <div className="col-lg order-app">
                        <h3 className="h3 m-4">Orders uploaded:</h3>
                        <div className="container-fluid d-flex justify-content-center">
                            <div className="info">
                                <h4>Total orders stored: {successCount} <br />
                                    Total orders having errors: {errorCount} <br /></h4>
                            </div>
                        </div>
                        {orders.length > 0 && renderOrders(orders, true)}
                    </div>
                        : null
                    }
                    {
                        errors.length > 0 ? <div className="col-lg">
                            {renderOrders(errors, true)}
                        </div> : null
                    }
                </div>
            </div>}
            {
                noRecords && <div className="container-fluid mt-5">
                    <div className="justify-content-center">
                        <h1>No unique data found to add!</h1>
                    </div>
                </div>
            }
        </div>
    )
}

export default Subsciber
