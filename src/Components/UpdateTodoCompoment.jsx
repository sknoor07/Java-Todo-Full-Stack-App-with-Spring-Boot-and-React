import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Security/AuthContext";
import { useEffect, useState } from "react";
import { AddTodo, retrieveTodo, updateTodo } from "./api/TodoApiService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";





function UpdateTodoComponent(){
    const {id} =useParams();
    const username=useAuth().username;
    const [description, SetDescrition] = useState("");
    const [targetDate, SettargetDate] = useState("");
    const navigate= useNavigate();


    
    function retrievenotesTodo(){
        retrieveTodo(username,id)
        .then((res)=>{
            console.log(res)
            SetDescrition(res.data.description);
            SettargetDate(res.data.targetDate);
        })
        .catch((err)=> console.log(err));;
    }

    useEffect(() => {
    if (id !== "-1") { 
        retrievenotesTodo();
    }
}, [id]);

    function saveTodo(values){
        const todo={
            id:id,
            username:username,
            description:values.description,
            targetDate:values.targetDate,
            done:false
        }

        if(parseInt(id)===-1){
            AddTodo(username, id, todo)
            .then((res)=>{
                console.log(res)
                navigate("/listtodos");
            })
            .catch((err)=>{
            })

        }else{
            console.log("this is executed");
            updateTodo(username, id, todo)
            .then((res)=>{
                console.log(res)
                navigate("/listtodos");
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
        
    }

    function validateinput(values){
        let errors={}
        if(values.description.length<5)
            errors.description="Enter atleast 5 alphabet"
        if(values.targetDate===null || values.targetDate==='' || !moment(values.targetDate).isValid())
            errors.targetDate="Enter target Date"
        return errors;
    }

    return(
        <div className="container">
            <h1> Enter/Edit Todo Details</h1>
            <div>
                <Formik initialValues={{description,targetDate}}
                enableReinitialize={true}
                onSubmit={saveTodo}
                validate={validateinput}
                validateOnChange={false}
                validateOnBlur={false}
                >
                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage 
                                className="alert alert-warning"
                                name="description"
                                component="div"
                                />
                                <ErrorMessage 
                                className="alert alert-warning"
                                name="targetDate"
                                component="div"
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="Submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default UpdateTodoComponent;