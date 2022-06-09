import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "../App.css";
import data from "../mock-data.json";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";

import Context from "../Store/Context";

function Actor() {
  const { TAW, setTAW } = React.useContext(Context);

  const [actors, setActors] = useState(() => {
    const storageActors = JSON.parse(localStorage.getItem("actors"));
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
    newFormData[fieldName] = fieldValue.slice(0, -1);
    // setTimeout(() => {
    //   newFormData[fieldName] = fieldValue.slice(0, -2);
    //   setEditFormData(newFormData);
    // }, 2000);
    console.log(newFormData);
    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newActor = {
      id: actors.length + 1,
      name: addFormData.name,
      description: addFormData.description,
      numberOfActors: addFormData.numberOfActors,
      valueOfEachActor: addFormData.valueOfEachActor,
      note: addFormData.note,
    };

    const newActors = [...actors, newActor];
    const jsonActors = JSON.stringify(newActors);
    localStorage.setItem("actors", jsonActors);
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
    localStorage.setItem("actors", jsonActors);
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

    newActors.splice(index, 1);
    const jsonActors = JSON.stringify(newActors);
    localStorage.setItem("actors", jsonActors);
    setActors(newActors);
  };

  var amount = 0;
  actors.forEach((element) => {
    amount += parseInt(element.valueOfEachActor);
    setTAW(amount);
  });

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>TT</th>
              <th>Loại Actor</th>
              <th>Mô tả</th>
              <th>Số tác nhân</th>
              <th>Điểm của từng loại tác nhân</th>
              <th>Ghi chú</th>
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
            <tr>
              <td></td>
              <td></td>
              <td>amount</td>
              <td></td>
              <td>{amount}</td>
              <td className="something"></td>
            </tr>
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
        <input
          type="text"
          name="valueOfEachActor"
          required="required"
          placeholder="Value of each actor"
          onChange={handleAddFormChange}
        />
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

export default Actor;
