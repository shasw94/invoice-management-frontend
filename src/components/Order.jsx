import { ArrowForward } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import orderService from '../services/order.service';

const Order = (props) => {
    const order = props.order;
    const history = useHistory();

    const handleOnClick = () => {
        // orderService.getOrderById(order.id).then((response) => {
        //     console.log(response.data);
        // })
        history.push('/orders/' + order.id);
    }

    const handleError = () => {

    }

    return (
        <div
            className={!props.isSuccess ? 'order-row complete' : 'order-row pointer'}
            key={props.keys}
            onClick={() => { props.isSuccess ? handleOnClick() : handleError()}}
        >
            <div key={order.orderNumber} >
                {order.orderNumber}
            </div>
            <div className='icons'>
                <ArrowForward
                    
                    className='forward-icon'
                />
            </div>
        </div>
    )
}

export default Order
