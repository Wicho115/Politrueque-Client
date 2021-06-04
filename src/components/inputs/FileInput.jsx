import React, { useState, useEffect } from 'react';
import Files from 'react-files';
import Femenino from '../../img/DefaultFE.png'

import PoliArticle from "../../img/PoliArticulo.png";

const FileInput = ({ instuctions, defaultImg, imgFormat, upperChange }) => {
    
    const [url, seturl] = useState();
    const [name, setName] = useState(null);

    const handleChange = (files) => {
        if (files[0] !== undefined) {    
            setName(files[0].name)
            seturl(files[0].preview.url);    
            upperChange(files);
        }
    }

    const handleError = (err, file) => {
        console.log("Archivo incompatible");
        console.log(err.message);
    }
  

    const handleFormat = (imgFormat) => {
        switch (imgFormat) {
            case "profile":
                return (
                    <>
                        <div className="col-ml-4 img-previa">
                            <img src={(() =>{
                                if(!url) return defaultImg;
                                return url;
                            })()} className="card-img img-perfil" alt="" />
                        </div>
                    </>
                );

            case "article":
                return (
                    <>
                        <div className="col-ml-4 img-previa">
                            <img src={(() =>{
                                if(!url) return defaultImg;
                                return url;
                            })()} className="card-img img-thumbnail img-artículo" alt="" />
                        </div>
                    </>
                );

            case "new-article":
                return (
                    <>
                        <div className="col-ml-4 img-previa">
                            <img src={(() =>{
                                if(!url) return PoliArticle;
                                return url;
                            })()} className="card-img img-thumbnail img-artículo" alt="" />
                        </div>
                    </>
                );

            default:
                return (
                    <>
                        <div className="col-ml-4 img-previa">
                            <img src={(() =>{
                                if(!url) return defaultImg;
                                return url;
                            })()} className="card-img img-thumbnail img-artículo" alt="" />
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
                            <label className="custom-file-label">{(() =>{
                                if(!name)return "Seleccionar un archivo"
                                return name;
                            })()}</label>
                        </Files>

                    </div>
                </div>
            </div>
        </>
    );
}

export default FileInput;