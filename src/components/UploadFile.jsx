import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { Form } from './Form';
import { MaterialFileInput } from './MaterialFileUpload';
import uploadService from '../services/upload.file.service';
// import SendButton from './SendButton';

const UploadFile = (props) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const onSubmit = () => {
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
