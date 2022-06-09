import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "../App.css";
import data from "../moke-data-PTMP.json";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";

import Context from "../Store/Context";

function PTMP() {
  const { EF, setEF } = React.useContext(Context);
  const { P, setP } = React.useContext(Context);
  const [actors, setActors] = useState(() => {
    const storageActors = JSON.parse(localStorage.getItem("PTMP"));
    return storageActors || data;
  });
  const [addFormData, setAddFormData] = useState({
    name: "",
    description: "",
    numberOfActors: "",
    valueOfEachActor: "",
    note: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    numberOfActors: "",
    valueOfEachActor: "",
    note: "",
  });

  const [editActorId, setEditActorId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };

    // const newFormData = addFormData;
    console.log(newFormData);
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    // editFormData;
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newActor = {
      id: actors.length - 5,
      name: addFormData.name,
      description: addFormData.description,
      numberOfActors: addFormData.numberOfActors,
      valueOfEachActor:
        parseFloat(addFormData.description) *
        parseFloat(addFormData.numberOfActors),
      note: addFormData.note,
    };
    var currentActor = [...actors];
    currentActor[0].valueOfEachActor += parseFloat(newActor.valueOfEachActor);
    currentActor[currentActor.length - 2].note += parseFloat(newActor.note);
    currentActor[currentActor.length - 3].valueOfEachActor =
      1.4 + -0.03 * parseFloat(currentActor[0].valueOfEachActor);
    currentActor.splice(currentActor.length - 3, 0, newActor);
    // currentActor[currentActor.length - 1].valueOfEachActor =
    //   0.6 + 0.01 * currentActor[0].valueOfEachActor;
    const newActors = currentActor;
    const jsonActors = JSON.stringify(newActors);
    localStorage.setItem("PTMP", jsonActors);
    setActors(newActors);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedActor = {
      id: editActorId,
      name: editFormData.name,
      description: editFormData.description,
      numberOfActors: editFormData.numberOfActors,
      valueOfEachActor: editFormData.valueOfEachActor,
      note: editFormData.note,
    };

    const newActors = [...actors];

    const index = actors.findIndex((actor) => actor.id === editActorId);

    newActors[index] = editedActor;
    const jsonActors = JSON.stringify(newActors);
    localStorage.setItem("PTMP", jsonActors);
    setActors(newActors);
    setEditActorId(null);
  };

  const handleEditClick = (event, actor) => {
    event.preventDefault();
    setEditActorId(actor.id);

    const formValues = {
      id: actor.id,
      name: actor.name,
      description: actor.description,
      numberOfActors: actor.numberOfActors,
      valueOfEachActor: actor.valueOfEachActor,
      note: actor.note,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditActorId(null);
  };

  const handleDeleteClick = (actorId) => {
    const newActors = [...actors];

    const index = actors.findIndex((actor) => actor.id === actorId);
    var currentActor = [...actors];
    currentActor[currentActor.length - 2].note -= parseFloat(
      newActors[index].note
    );
    currentActor[0].valueOfEachActor -= parseFloat(
      newActors[index].valueOfEachActor
    );

    // currentActor[currentActor.length - 1].valueOfEachActor =
    //   0.6 + 0.01 * currentActor[0].valueOfEachActor;
    newActors.splice(index, 1);
    currentActor[currentActor.length - 3].valueOfEachActor =
      1.4 + -0.03 * parseFloat(currentActor[0].valueOfEachActor);
    const jsonActors = JSON.stringify(newActors);
    localStorage.setItem("PTMP", jsonActors);
    setActors(newActors);
  };

  var amount = 0;
  if (actors[actors.length - 2].note >= 3) {
    amount = 20;
  } else if (actors[actors.length - 2].note >= 1) {
    amount = 32;
  } else amount = 48;

  var currentActor = [...actors];
  currentActor[currentActor.length - 1].description = amount;
  setP(currentActor[currentActor.length - 1].description);
  setEF(currentActor[currentActor.length - 3].valueOfEachActor);
  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>TT</th>
              <th>Các hệ số tác động môi trường</th>
              <th>Trọng số</th>
              <th>Giá trị xếp hạng</th>
              <th>Kết quả</th>
              <th>Độ ổn định kinh nghiệm</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {actors.map((actor, index) => (
              <Fragment>
                {editActorId === actor.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    index={index}
                    actor={actor}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
            {/* <tr>
              <td></td>
              <td></td>
              <td>amount</td>
              <td></td>
              <td>{amount}</td>
              <td className="something"></td>
            </tr> */}
          </tbody>
        </table>
      </form>

      <h2>Add an Actor</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="description"
          required="required"
          placeholder="Description"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="numberOfActors"
          required="required"
          placeholder="Number of actors"
          onChange={handleAddFormChange}
        />
        {/* <input
          type="text"
          name="valueOfEachActor"
          required="required"
          placeholder="Value of each actor"
          onChange={handleAddFormChange}
        /> */}
        <input
          type="text"
          name="note"
          placeholder="note"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default PTMP;
