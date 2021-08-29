import React, { useEffect, useState } from 'react';
import orderService from '../services/order.service';
import { DataGrid } from '@material-ui/data-grid';
import Title from '../components/Title';
import Order from '../components/Order';
import { Pagination } from '@material-ui/lab';
import Swal from 'sweetalert2';
import CsvDownload from 'react-json-to-csv'


const OrderPage = () => {
    const [rows, setRows] = useState([]);
    const [meta, setMeta] = useState(0);
    const [page, setPage] = useState(1);
    const [showExport, setShowExport] = useState(false);
    useEffect(() => {
        orderService.getOrders().then((response) => {
            setRows(response.data.data);
            setMeta(response.data.meta);
            setPage(response.data.meta.currentPage);
        })
    }, []);

    const handlePagination = (event, value) => {
        setPage(value);
        const params = `?page=${value}&limit=${20}&sortBy=id:DESC`;
        orderService.getOrders(params).then((response) => {
            setRows(response.data.data);
            setMeta(response.data.meta);

        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setShowExport(true);
        // search=i&filter.age=$gte:3
        if (document.getElementById('minDate').value === "" || document.getElementById('maxDate').value === "") {
            Swal.fire('Oops!',
                'Please select a range',
                'error')
        }

        const params = "?minDateRange=" + document.getElementById('minDate').value + "&maxDateRange=" + document.getElementById('maxDate').value;
        orderService.getOrderFileter(params).then((response) => {
            setRows(response.data);
            setShowExport(true);
        }, (error) => {
            Swal.fire('Oops!',
                'Something went wrong',
                'error')
        })
    }
    // const classes = useStyles();
    return (
        <div >
            <div className="container-fluid  mb-5">
                <Title titleText={{
                    text: "Orders",
                    color: "white",
                }} />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg">
                        <form>
                            <div className="d-flex">
                                <div class="input-group flex-nowrap m-5">
                                    <span class="input-group-text" id="addon-wrapping">Start</span>
                                    <input id="minDate" type="date" class="form-control" placeholder="start date" aria-label="startDate" aria-describedby="addon-wrapping" />
                                </div>
                                <div class="input-group flex-nowrap m-5">
                                    <span class="input-group-text" id="addon-wrapping">End</span>
                                    <input id="maxDate" type="date" class="form-control" placeholder="end date" aria-label="startDate" aria-describedby="addon-wrapping" />
                                </div>
                            </div>
                            <div className="container-fluid d-flex">
                                <button className="btn btn-light" onClick={handleSubmit}>Submit</button>
                                {
                                    showExport && <CsvDownload data={rows} />
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {!showExport && <div className="container-fluid gray p-4 m-3">
                <div className="row">
                    <div className="col-lg">
                        <Pagination count={meta.totalItems} page={page} color="primary" shape="rounded" onChange={handlePagination} />
                    </div>
                </div>
            </div>}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg">
                        {
                            rows.length > 0 ? rows.map((row, index) => (
                                <div key={index}>
                                    <Order order={{ ...row }} isSuccess={true} />
                                </div>
                            )) : null
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default OrderPage
