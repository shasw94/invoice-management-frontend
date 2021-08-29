import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Title from '../components/Title';
import orderService from '../services/order.service';

const MemberComponent = (props) => {
    return (
        <div className="col-lg solid">
            <h4 className="below-dot">
                {props.title}
            </h4> <br />
            {props.value}
        </div>
    )
}

const OrderDetail = (props) => {
    const [order, setOrder] = useState();
    const [orderProd, setOrderProd] = useState([]);
    let { id } = useParams();
    useEffect(() => {

        orderService.getOrderById(id).then((response) => {
            setOrder(response.data);
            setOrderProd(response.data.orderToProduct);
        }, (error) => {
            Swal.fire('Oops!',
                'There was a problem',
                'error')
        })
    }, []);

    const totalComp = () => {
        const total = orderProd.reduce((total, obj) => obj.totalAmountPaid + total, 0);
        return (
            <div className="row container-fluid justify-content-end mt-5 ">
                <div className="col-lg ">
                    <div className="container-fluid solid">
                    <span><h3><b>Total Payable: NRs. {total}</b></h3></span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="container-fluid  m-5">
                <Title titleText={{
                    text: "Invoice",
                    color: "white",
                }} />
            </div>

            <div className="container-fluid dotted p-2">
                <div className="row">
                    <div className="col-lg location">
                        {order && <div className="container-fluid info">
                            Order #: {order.orderNumber} <br />
                            Order Date: {order.date}
                        </div>}
                    </div>
                    <div className="col-lg">

                    </div>
                </div>
                <div className="row container-fluid justify-content-center mt-5">
                    {
                        orderProd.map((prod, ind) => (
                            <div className="d-flex">
                                <MemberComponent title="Product" value={prod.product.name} />
                                <MemberComponent title="Brand" value={prod.product.brand.name} />
                                <MemberComponent title="Location" value={prod.location} />
                                <MemberComponent title="Quantity" value={prod.quantity} />
                                <MemberComponent title="Rate" value={prod.product.rate} />
                                <MemberComponent title="Gross Amount" value={prod.totalAmountPaid} />
                            </div>
                        ))
                    }
                </div>
                {totalComp()}
            </div>
        </div>
    )
}

export default OrderDetail
