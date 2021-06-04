
class Auth{
    constructor(){
        this.user = null;
        this.privileges = null;
    }

    async login(data){
        console.log(data);
        console.log('entrando al login');
        const response = await fetch('http://26.185.54.28:5000/auth/login',{
            method : 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })        
        console.log('Acá espero');
        const json = await response.json();            
        console.log(json);
        if(!json.error) localStorage.setItem('token', json.access_token)
        return json;
    }

    async logout(){
        const token = localStorage.getItem('token');
        if(!token){
            return console.log('No hay token en logout');
        }
        const response = await fetch(`http://26.185.54.28:5000/auth/logout?token=${token}`,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        const data = await response.json();
        localStorage.removeItem('token');
        this.user = null
        this.privileges = null;
        console.log(data);
    }

    async validate(){
        const token = localStorage.getItem('token');       
        if(!token){            
            return 0;
        }        
        const response = await fetch(`http://26.185.54.28:5000/auth/validate?token=${token}`,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        const data = await response.json();
        console.log(data);
        if(data.valid){
            this.user = data.user;
            if(!data.privileges){                
                return 1
            }else{
                this.privileges = data.privileges;
                return 2
            }
        }else{
            console.log('Devolviendo ultimo 0');
            return 0;
        }    
    }
}

export default new Auth();