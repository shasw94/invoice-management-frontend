import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { Form } from './Form';
import { MaterialFileInput } from './MaterialFileUpload';
import uploadService from '../services/upload.file.service';
import Swal from 'sweetalert2';
// import SendButton from './SendButton';

const UploadFile = (props) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const onSubmit = () => {
        const size = parseFloat(selectedFile.size / (1024 * 1024)).toFixed(2);
        if (size > 20) {
            Swal.fire('Sorry', 'File size must be less than 20MB', 'error');
        }
        props.setFileUploadState("UPLOADING");
        const formData = new FormData();
        formData.append("file", selectedFile);
        uploadService.uploadExcel(formData).then((response) => {
            props.setFileUploadState("UPLOADED");
        }, (error) => {
            props.setFileUploadState("ERROR");
            return;
        })
    }

    return (
        <Form>
            <div className="container-fluid row">
                <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                {/* <MaterialFileInput name="file" control={control} text={`Drag 'n' drop excel file here, or click to upload`} /> */}
            </div>
            <div className="container-fluid row justify-content-center">
                <div className="col-lg-4 d-flex justify-content-center">
                    {/* <SendButton /> */}
                    <button onClick={onSubmit} className="btn btn-light"> Submit </button>
                </div>
            </div>
        </Form>
    )
}

export default UploadFile
