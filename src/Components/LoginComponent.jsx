import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TodoApp.css'
import "C:/Users/noor/Desktop/FrontEnd/todoapp/node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
import { useAuth } from './Security/AuthContext';

function LoginComponent(){

    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [showSuccessMesage,setShowSuccessMesage]=useState(false);
    const [showErrorMesage,setShowErrorMesage]=useState(false);
    const navigate=useNavigate();
    const useauth=useAuth();
    function handleUserName(e){
        setUsername(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }

    async function handleLogin(){
        if(await useauth.login(username,password)){
            navigate(`/welcome/${username}`);
            

        }else{
            setShowErrorMesage(true);            
        }
    }

    return(
    <div className="Login">
        <div className="LoginForm">
            <div>
                <label>User Name</label>
                <input  type="text" placeholder=" Enter User Name" name="username" value={username} onChange={handleUserName}/>
            </div>
            <div>
                <label>Password</label>
                <input  type="password" placeholder=" Enter Password" name="password"value={password} onChange={handlePassword}/>
            </div>
            <div>
                <button type="button" onClick={handleLogin}> Login</button>
            </div>
            <div>
                {showSuccessMesage && <div>Authenticated Successfully</div>}
                {showErrorMesage && <div> Authentication Failed</div>}
            </div>
        </div>
    </div>
);
}

export default LoginComponent;