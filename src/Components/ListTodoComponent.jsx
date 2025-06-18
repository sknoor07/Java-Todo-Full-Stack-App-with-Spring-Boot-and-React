import "C:/Users/noor/Desktop/FrontEnd/todoapp/node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
function ListTodoComponent(){
    const today= new Date();
    const newDate= new Date(today.getFullYear()+12,today.getMonth(),today.getDate());
    const todos=[
        {id:1, desc:"Noor",done:false,targetDate:newDate},
        {id:2, desc:"Noor Alam",done:false,targetDate:newDate},
        {id:3, desc:"Noor Alam Shaikh",done:false,targetDate:newDate},
        {id:4, desc:"Noor Alam Ahbar Ahmed Shaikh",done:false,targetDate:newDate},
    ];
    return(<div className="container">
        Todo Component
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Description</th>
                    <th>is Done?</th>
                    <th>Target Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    todos.map(ele=>
                    (
                        <tr key={ele.id}>
                            <td>{ele.id}</td>
                            <td>{ele.desc}</td>
                            <td>{ele.done.toString()}</td>
                            <td>{ele.targetDate.toDateString()}</td>
                        </tr>
                    )
                    )
                }
            </tbody>
        </table>
    </div>
    );
}

export default ListTodoComponent;