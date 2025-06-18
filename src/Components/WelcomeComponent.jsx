import { useParams,Link } from "react-router-dom";
import "C:/Users/noor/Desktop/FrontEnd/todoapp/node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";

function WelcomeComponent(){
    const {username} =useParams();
    return(
    <div className="WelcomeComponent">
        <h1>Welcome {username}</h1>
        <div>
            Manage Your Todos - <Link to="/listtodos">Go Here</Link>
        </div>
    </div>
);
}

export default WelcomeComponent;