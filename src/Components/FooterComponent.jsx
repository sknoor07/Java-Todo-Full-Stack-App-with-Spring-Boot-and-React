import "C:/Users/noor/Desktop/FrontEnd/todoapp/node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
import "./TodoApp.css"
function FooterComponent(){
    const  date= new Date();
    const year= date.getFullYear();
    return(<footer className="footer">
        <div className="footer">
            CopyRight@{year.toString()}
        </div>
    </footer>
    );
}

export default FooterComponent;