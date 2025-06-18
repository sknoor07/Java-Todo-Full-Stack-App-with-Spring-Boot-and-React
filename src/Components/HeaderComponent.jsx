import "C:/Users/noor/Desktop/FrontEnd/todoapp/node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
import { Link,useNavigate } from "react-router-dom";

function HeaderComponent() {
    const navigate = useNavigate();

    function handleLogin(){
            navigate("/login");
    }
    function handleLogout(){
            navigate("/logout");
    }
    return (
        <header className="header">
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <div className="col-md-3 mb-2 mb-md-0">
                        <a href="https://www.google.com" className="d-inline-flex link-body-emphasis text-decoration-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
</svg>
                                <use xlinkHref="https://www.google.com"></use>
                        </a>
                    </div>
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/Welcome/Noor" className="nav-link px-2 link-secondary">Home</Link></li>
                        <li><Link to="/listtodos" className="nav-link px-2">List of To Do's</Link></li>
                        <li><a href="*" className="nav-link px-2">Pricing</a></li>
                        <li><a href="*" className="nav-link px-2">FAQs</a></li>
                        <li><a href="*" className="nav-link px-2">About</a></li>
                    </ul>
                    <div className="col-md-3 text-end">
                        <button type="button" className="btn btn-outline-primary me-2" style={{margin:"10px"}} onClick={handleLogin}>Login</button>
                        <button type="button" className="btn btn-primary"onClick={handleLogout}>Logout</button>
                    </div>
                </header>
            </div>
        </header>
    );
}

export default HeaderComponent;
