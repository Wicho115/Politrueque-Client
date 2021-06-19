import React, {useState} from "react";
import {useLocation} from 'react-router-dom';
import {gql, useMutation, useQuery} from '@apollo/client'

import SecondNav from "../../components/SecondNav";
import FormsContainer from "../../components/FormsContainer";
import FormInput from "../../components/inputs/FormInput";
import DescriptionInput from "../../components/inputs/DescriptionInput";
import Loading from "../../components/Loading";

const GET_REPORT = gql`
    query getReport($id : String!){
        getReport(id : $id){
            _id,
            title,
            description,
        }
    }
`
const UPDATE_REPORT = gql`
mutation edit($payload : UpdateReportInput!){
  updateReport(payload : $payload){
    _id
  }
}`


const useQueryURL = () => {
    return new URLSearchParams(useLocation().search);
};

const EditReport = () => {
    const query = useQueryURL();
    const id = query.get('art');
    const [editedReport, setEditedReport] = useState({});

    const {data, loading, error} = useQuery(GET_REPORT, {variables: {id}, 
    onCompleted : (data) => {
        setEditedReport(data.getReport)
    }});
    const [updateReport, {loading : Mloading, error : Merror}] = useMutation(UPDATE_REPORT, 
    {onCompleted : (data) =>{
        window.location.assign(`${window.location.origin}/report?r=${data.updateReport._id}`)
    }});

    const handleChange = e =>{
        setEditedReport({...editedReport, [e.target.name] : e.target.value})
    }

    const handleUpdate = e =>{
        const payload = {
            id,
            description : editedReport.description,
            title : editedReport.title
        }
        updateReport({variables : {payload}})
    }

    return (
        <>
            {/* Contenedor para agregar un nuevo artículo */}
            <div className="conetnedor_secundario_2">
                <SecondNav>
                    <a className="nav-link">Editar Reporte</a>
                </SecondNav>
                <FormsContainer>
                    
                       
                        <div className="columna_doble_fomulario">
                            <FormInput small="Título del Reporte" label="Título">
                                <input onChange={handleChange} value={editedReport.title} type="text" className="form-control" name="title" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </FormInput>
                        </div>
                        <div className="form-group">
                            <DescriptionInput
                                toDescribe="Cuerpo del Reporte"
                                suggestion="Explica a que artículo o a que usuario está dirigido el reporte y porque se genera este reporte."
                                minmax="Máximo 500 Caracteres">
                                <textarea onChange={handleChange} value={editedReport.description} className="form-control" name="description" id="exampleFormControlTextarea1" rows={3}/>
                            </DescriptionInput>
                        </div>
                        <div className="form-group centrar">
                            <small id="emailHelp" className="form-text text-muted">Podrás modificar los datos posteriormente</small>
                            <button onClick={handleUpdate} className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Actualizar Reporte</button>
                        </div>
                </FormsContainer>
            </div>
        </>
    );
};

export default EditReport;