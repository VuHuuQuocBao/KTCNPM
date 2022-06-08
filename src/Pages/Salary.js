import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "../App.css";
import data from "../mock-data-salary.json";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";

import Context from "../Store/Context";

function Actor() {
  const { salary, setSalary } = React.useContext(Context);

  const [actors, setActors] = useState(() => {
    const storageActors = JSON.parse(localStorage.getItem("salary"));
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
      id: actors.length + 1,
      name: addFormData.name,
      description: addFormData.description,
      numberOfActors: addFormData.numberOfActors,
      valueOfEachActor: addFormData.valueOfEachActor,
      note:
        parseInt(addFormData.numberOfActors) *
        parseInt(addFormData.valueOfEachActor),
    };

    const newActors = [...actors, newActor];
    const jsonActors = JSON.stringify(newActors);
    localStorage.setItem("salary", jsonActors);
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
    localStorage.setItem("salary", jsonActors);
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
    localStorage.setItem("salary", jsonActors);
    setActors(newActors);
  };

  var amount = 0;
  actors.forEach((element) => {
    amount += parseFloat(element.note);
  });
  var amount1 = 0;
  var totalPeople = 0;
  actors.forEach((element) => {
    totalPeople += parseFloat(element.valueOfEachActor);
  });
  amount1 = amount / totalPeople;
  var amount2 = 0;
  amount2 = amount1 / 160;
  setSalary(amount2);
  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>TT</th>
              <th></th>
              <th></th>
              <th>Mức Lương</th>
              <th>Số Lượng Cán Bộ</th>
              <th>Tổng</th>
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
              <td>Tổng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>

              <td>{amount}</td>
              <td className="something"></td>
            </tr>
            <tr>
              <td>Người/tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>

              <td>{amount1}</td>
              <td className="something"></td>
            </tr>
            <tr>
              <td>Người/giờ</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>

              <td>{amount2}</td>
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
        {/* <input
          type="text"
          name="note"
          placeholder="note"
          onChange={handleAddFormChange}
        /> */}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Actor;
