import ErrorComponent from "./ErrorComponent";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodoComponent from "./ListTodoComponent";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from "./WelcomeComponent";
import {BrowserRouter,Routes,Route} from "react-router-dom" 

import "C:/Users/noor/Desktop/FrontEnd/todoapp/node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
function TodoApp(){
    return(
    <div className="TodoApp">
        <h1>Todo Management App</h1>

        <BrowserRouter>
            <HeaderComponent />
            <Routes>
                <Route path="/" element={<LoginComponent />}/>
                <Route path="/login" element={<LoginComponent />}/>
                <Route path='/welcome/:username' element={<WelcomeComponent />}/>
                <Route path="/listtodos" element={<ListTodoComponent />}/>
                <Route path="/logout" element={<LogoutComponent />} />
                <Route path="*" element={<ErrorComponent />} />
            </Routes>
            <FooterComponent />
        </BrowserRouter> 
        
           </div>
        );
}

export default TodoApp;