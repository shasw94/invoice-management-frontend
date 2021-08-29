import React, { useState } from 'react'
import Loader from 'react-loader-spinner';
import Title from '../components/Title'
import UploadFile from '../components/UploadFile';
import { Checkmark } from 'react-checkmark'
import Swal from 'sweetalert2';
import Subsciber from '../components/Subsciber';

const Home = () => {
    const [fileUploadState, setFileUploadState] = useState("NOTHING");
    const [titleText, setTitleText] = useState({
        text: "Upload an excel file:",
        color: "white",
    });
    const [filename, setFileName] = useState("");

    const setUploadedFile = (file) => {
        setFileName(file);
    }

    const setStatus = (status) => {
        setFileUploadState(status);
        switch (status) {
            default:
            case "NOTHING":
                setTitleText({
                    text: "Upload an excel file:",
                    color: "white",
                });
                break;
            case "UPLOADING":
                setTitleText({
                    text: "File is being uploaded to the server",
                    color: "cyan",
                });
                break;
            case "UPLOADED":
                setTitleText({
                    text: "File has been Uploaded Successfully",
                    color: "green",
                });
                break;
            case "ERROR":
                setTitleText({
                    text: "Oops, the something went wrong",
                    color: "red",
                });
                break;
        }
    }

    const reset = () => {
        setFileUploadState("NOTHING");
    }

    const renderComponent = (status) => {
        switch (status) {
            default:
            case "NOTHING":
                return <UploadFile setFileUploadState={setStatus} />
            case "UPLOADING":
                return <Loader type="Bars" color="#00BFFF" />
            case "UPLOADED":
                return (<div>
                    <Checkmark size='xxLarge' />
                    <button className="btn btn-light" onClick={reset}>Upload Another</button>
                </div>)
            case "ERROR":
                let timerInterval
                Swal.fire({
                    title: 'Error',
                    html: 'An error has occurred. Closing in: <b></b> sec',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft() / 1000;
                        }, 1000)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        return <UploadFile setFileUploadState={setStatus} />
                    }
                })
        }
    }

    return (
        <div>
            <div className="container-fluid mt-5 mb-5">
                <Title titleText={titleText} />
            </div>
            <div className="container-fluid">
                <div className="row">
                    {/* <div className="col-lg-2">
                        <Menu />
                    </div> */}
                    <div className="col-lg">
                        <div className="container-fluid">
                            <div className="row justify-content-md-center">
                                <div className="col col-lg-4">
                                    {renderComponent(fileUploadState)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <Subsciber filename={filename} />
            </div>
        </div>
    )
}

export default Home
