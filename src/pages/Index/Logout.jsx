import React, {useEffect} from 'react'
import auth from '../../auth/auth';

const Logout = () =>{
    const token = localStorage.getItem('token');
    useEffect(() =>{
        if(!token){
            console.log('No tienes token en el use effect de logout');
        }else{
            console.log('Tienes token en el use effect de logout');
            auth.logout().then((data) =>{
                console.log('Hasta uego giles ctm');
                window.location.reload();
            })            
        }
    },[])
    return (<>
        <h1>{token && 'Gracias por pasarte!'}</h1>     
    </>);
}

export default Logout;