import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { deleteTodo, retrieveAllTodosForAUser } from "./api/TodoApiService";
import { useAuth } from "./Security/AuthContext";
import { useNavigate } from "react-router-dom";
function ListTodoComponent(){
    const[todos,settodos]= useState([]);
    const[deletemessage,setdeletemessage]= useState(null);
    const useauth= useAuth();
    const username=useauth.username;
    const navigate=useNavigate();
    
    // const todos=[
    //     {id:1, desc:"Noor",done:false,targetDate:newDate},
    //     {id:2, desc:"Noor Alam",done:false,targetDate:newDate},
    //     {id:3, desc:"Noor Alam Shaikh",done:false,targetDate:newDate},
    //     {id:4, desc:"Noor Alam Ahbar Ahmed Shaikh",done:false,targetDate:newDate},
    // ];
    function refreshTodos(){
        retrieveAllTodosForAUser(username)
        .then((response)=>{
            settodos(response.data)
            }
        )
        .catch((error)=>console.log(error));
    }

    useEffect(()=>{refreshTodos()},[]);

    function deletetodo(id){
        if(!id) console.log("No id found")
        deleteTodo(username,id)
        .then((res)=> {
            setdeletemessage(`Deleted Todo with id ${id}`);
            refreshTodos()
            console.log(res)
        })
        .catch((err)=>console.log(err));
    }

    function updatetodo(id){
        if(!id) console.log("No id found")
        navigate(`/todo/${id}`);
    }

    return(<div className="container">
        Todo Component
        <h1> Things you want to do</h1>
        {deletemessage&&<div className="alert alert-warning">{deletemessage}</div>}
        <table className="table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>is Done?</th>
                    <th>Target Date</th>
                    <th>Delete</th>
                    <th>update</th>
                </tr>
            </thead>
            <tbody>
                {
                    todos.map(ele=>
                    (
                        <tr key={ele.id}>
                            <td>{ele.description}</td>
                            <td>{ele.done.toString()}</td>
                            <td>{ele.targetDate.toString()}</td>
                            <td><button className="btn btn-warning" onClick={()=>deletetodo(ele.id) }>delete</button></td>
                            <td><button className="btn btn-success" onClick={()=>updatetodo(ele.id) }>update</button></td>
                        </tr>
                    )
                    )
                }
            </tbody>
        </table>
        <div>
            <button className="btn btn-success m-4" onClick={()=> updatetodo(-1)}> Add Todo</button>
        </div>
    </div>
    );
}

export default ListTodoComponent;