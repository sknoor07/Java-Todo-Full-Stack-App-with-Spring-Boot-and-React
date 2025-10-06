import React, { useEffect, useState } from "react";

import "../App.css";
import { useAuth } from "./Security/AuthProvider";
import { deleteNote, retrieveAllNotesForUser } from "./Api/api";
import { useNavigate } from "react-router-dom";

function ListNotes() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([{}]);

  async function refeshNotes() {
    try {
      const response = await retrieveAllNotesForUser(authContext.userid);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  useEffect(() => {
    refeshNotes();
  }, []);

  async function handleDeleteNote(id) {
    try {
      console.log(`delete note ${id} for user ${authContext.userid}`);
      await deleteNote(authContext.userid, id).then(() => {
        refeshNotes();
        console.log("Note deleted successfully");
      });
    } catch (error) {
      console.error("Error Deleting notes:", error);
    }
  }

  async function handleUpdateNote(id) {
    navigate(`/updateNote/${id}`);
  }

  return (
    <div className="container">
      <h1> Things to do</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => {
              return (
                <tr key={index}>
                  <td>{note.description}</td>
                  <td>
                    {note.targetDate
                      ? new Date(note.targetDate).toDateString()
                      : ""}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleUpdateNote(note.id)}
                    >
                      update
                    </button>
                  </td>
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
