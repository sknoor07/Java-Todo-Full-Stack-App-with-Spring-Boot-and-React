import React from "react";

import "../App.css";

function ListNotes() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDate()
  );
  const notes = [
    { id: 1, description: "Learn Fulll Stack", targetDate: targetDate },
    { id: 2, description: "Learn Aws ", targetDate: targetDate },
    { id: 3, description: "Learn Spring Boot", targetDate: targetDate },
    { id: 4, description: "Learn Spring AI", targetDate: targetDate },
  ];
  return (
    <div className="container">
      <h1> Things to do</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Description</td>
              <td>Target Date</td>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => {
              return (
                <tr key={index}>
                  <td>{note.id}</td>
                  <td>{note.description}</td>
                  <td>{note.targetDate.toDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListNotes;
