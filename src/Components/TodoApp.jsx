import ErrorComponent from "./ErrorComponent";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodoComponent from "./ListTodoComponent";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from "./WelcomeComponent";
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom" 

import "C:/Users/noor/Desktop/FrontEnd/todoapp/node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
import AuthProvider, { useAuth } from "./Security/AuthContext";
import UpdateTodoComponent from "./UpdateTodoCompoment";



function AuthenticateRoute({children}){
    const useauth=useAuth();
    if(useauth.isAuthenticated){
        return children;
    }else{
        return <Navigate to="/" />
    }
}
function TodoApp(){
    return(
    <div className="TodoApp">
        <h1>Todo Management App</h1>
        <AuthProvider>
        <BrowserRouter>
            <HeaderComponent />
                <Routes>
                    <Route path="/" element={<LoginComponent />}/>
                    <Route path="/login" element={<LoginComponent />}/>
                    <Route path='/welcome/:username' element={<AuthenticateRoute><WelcomeComponent /></AuthenticateRoute>}/>
                    <Route path='/todo/:id' element={<AuthenticateRoute><UpdateTodoComponent /></AuthenticateRoute>}/>
                    <Route path="/listtodos" element={<AuthenticateRoute><ListTodoComponent /></AuthenticateRoute>}/>
                    <Route path="/logout" element={<AuthenticateRoute><LogoutComponent /></AuthenticateRoute>} />
                    <Route path="*" element={<AuthenticateRoute><ErrorComponent /></AuthenticateRoute>} />
                </Routes>
            <FooterComponent />
        </BrowserRouter> 
        </AuthProvider>
        
           </div>
        );
}

export default TodoApp;