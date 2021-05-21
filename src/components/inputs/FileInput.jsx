import React, { useState, useEffect } from 'react';
import Files from 'react-files';
import { useMutation, gql } from '@apollo/client'

const FileInput = ({ instuctions, defaultImg, imgFormat }) => {

    const [url, seturl] = useState(defaultImg);
    const [image, setImage] = useState(null)

    useEffect(() => {
        seturl(defaultImg);
    }, [])

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
        console.log("Archivo incompatible");
        console.log(err.code);
        console.log(err.message);
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

    const handleFormat = (imgFormat) => {
        switch (imgFormat) {
            case "profile":
                return (
                    <>
                        <div className="col-ml-4 img-previa">
                            <img src={url} className="card-img img-perfil" alt="" />
                        </div>
                    </>
                );

            case "article":
                return (
                    <>
                        <div className="col-ml-4 img-previa">
                            <img src={url} className="card-img img-thumbnail img-artículo" alt="" />
                        </div>
                    </>
                );

            case "new-article":
                return (
                    <>
                        <div className="col-ml-4 img-previa">
                            <img src={url} className="card-img img-thumbnail img-artículo" alt="" />
                        </div>
                    </>
                );

            default:
                return (
                    <>
                        <div className="col-ml-4 img-previa">
                            <p>c</p>
                            <img src={url} className="card-img img-thumbnail img-artículo" alt="" />
                        </div>
                    </>
                );

        }
    }

    return (
        <>
            <div className="add-img-1">
                {handleFormat(imgFormat)}
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
            </div>
        </>
    );
}

export default FileInput;