import React, {useState} from 'react';
import FileInput from '../../components/inputs/FileInput'
import Auth from '../../auth/auth'
import {gql, useQuery, useMutation} from '@apollo/client';

const GET_ACTUAL_USER = gql`
    query getBye{
        bye{
            _id,
            email,
            username
        }
    }
`;

const GET_FILE = gql`
        mutation uploadFile($file:Upload!){
            uploadFile(file:$file)
        }
`;

const Test = () =>{
    
    //const {loading, data, error} = useQuery(GET_ACTUAL_USER);
    const [image, setImage] = useState(null)

    const [UPLOAD_FILE, {data : mutationData}] = useMutation(GET_FILE,{
        onCompleted : (data) => console.log(data),
        onError : (err) => console.log(err.message),        
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();        
        await Auth.login({
            "email": "someuser2@somedomain.email.com",
            "password": "password",
            "boleta" : "45"
        })
        window.location.reload();
    }

    const handleLogout = () =>{
        Auth.logout();
    }    

    const handleChangeInput = (files) => {        
        if (files[0] !== undefined) {                   
            setImage(files[0]);
        }
    }

    const handleSubmitInput = () =>{
        const file = image;
        if(!file) return;
        UPLOAD_FILE({variables : {file}})
    }   

    return(
        <>
            <FileInput upperChange={handleChangeInput} defaultImg={"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Procyon_lotor_%28raccoon%29.jpg/230px-Procyon_lotor_%28raccoon%29.jpg"} imgFormat={"article"}/>

            <form onSubmit={handleSubmit}>
            <button>
                Enviar login
            </button>
            </form>
            

            <button onClick={handleLogout}>
                Logout
            </button>

            <button onClick={handleSubmitInput}>
                Subir imagen
            </button>

            <p>{JSON.stringify(mutationData)}</p>
        </>
    )
}

export default Test;