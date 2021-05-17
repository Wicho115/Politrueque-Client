import React, { useState } from 'react';
import Files from 'react-files';
import { useMutation, gql } from '@apollo/client'

const FileInput = ({ instuctions, defaultImg }) => {

    const [url, seturl] = useState(defaultImg);
    const [image, setImage] = useState(null)

    const GET_FILE = gql`
        mutation($file:Upload!){
            uploadFile(file:$file){
                url
            }
        }
    `;
    
    const handleChange = (files) => {
        if (files[0] !== undefined) {
            console.log(files[0]);
            seturl(files[0].preview.url);
            setImage(files[0]);
        }
    }

    const handleError = (err, file) => {
        console.log(err);
    }

    const [UploadFile] = useMutation(GET_FILE, {
        onCompleted: (data) => console.log(data),
        onError: function (err) { console.log(err) },

    })

    const handleSub = () => {
        const file = image;
        if (!file) return;
        UploadFile({ variables: { file } })
    }

    return (
        <>
            <div className="add-img-1">
                <div className="col-ml-4 img-previa">
                    <img src={url} className="card-img img-thumbnail img-artículo" alt="" />
                </div>
                <div className="img-input centrar">
                    <p>{instuctions}</p>
                    <div className="custom-file" style={{ textAlign: 'left' }}>

                        <Files
                            onChange={handleChange}
                            onError={handleError}
                            clickable
                            accepts={['image/png', 'image/jpeg', 'image/jpg']}
                            multiple={false}
                            maxFileSize={5000000}
                            minFileSize={3000}
                        >
                            <label className="custom-file-label">Seleccionar Archivo</label>
                        </Files>

                    </div>
                </div>
                <button onClick={handleSub}>
                    Submit?
                </button>
            </div>
        </>
    );
}

export default FileInput;