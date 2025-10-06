import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Security/AuthProvider";
import { retrieveNoteForUser, updateNoteForUser } from "./Api/api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment/moment";

function UpdateNoteComponent() {
  const { id } = useParams();
  const authContext = useAuth();
  const [updateNote, setUpdateNote] = React.useState({
    description: "",
    targetDate: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchNote();
  }, [id]);

  async function fetchNote() {
    try {
      await retrieveNoteForUser(id, authContext.userid)
        .then((response) => setUpdateNote(response.data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  }

  async function handleSubmit(values) {
    const note = {
      id: id,
      description: values.description,
      targetDate: moment(values.targetDate).format("YYYY-MM-DD"),
      isdone: false,
    };
    await updateNoteForUser(authContext.userid, id, note);
    navigate("/notes");
  }

  function validatevalues(values) {
    let errors = {};

    if (!values.description || values.description.length < 5) {
      errors.description = "Enter at least 5 characters in description";
    }

    if (!values.targetDate || !moment(values.targetDate).isValid()) {
      errors.targetDate = "Enter a valid target date";
    } else if (moment(values.targetDate).isBefore(moment(), "day")) {
      errors.targetDate = "Target date cannot be in the past";
    }

    console.log(errors);
    return errors;
  }

  return (
    <div className="container">
      UpdateNoteComponent
      <div>
        <Formik
          initialValues={updateNote}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validate={validatevalues}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <div>
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    type="text"
                    name="description"
                    className="form-control"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    type="date"
                    name="targetDate"
                    className="form-control"
                  />
                </fieldset>
                <div>
                  <button className="btn btn-success m-2" type="submit">
                    Save
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default UpdateNoteComponent;
