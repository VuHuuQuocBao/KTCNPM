import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "../App.css";
import data from "../mock-data-KTCN.json";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";

import Context from "../Store/Context";
function KTCN() {
  const { TCF, setTCF } = React.useContext(Context);
  const [actors, setActors] = useState(() => {
    const storageActors = JSON.parse(localStorage.getItem("KTCN"));
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
      id: actors.length - 1,
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
    currentActor.splice(currentActor.length - 1, 0, newActor);
    currentActor[currentActor.length - 1].valueOfEachActor =
      0.6 + 0.01 * currentActor[0].valueOfEachActor;
    const newActors = currentActor;
    const jsonActors = JSON.stringify(newActors);
    localStorage.setItem("KTCN", jsonActors);
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
    localStorage.setItem("KTCN", jsonActors);
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
    currentActor[0].valueOfEachActor -= parseFloat(
      newActors[index].valueOfEachActor
    );
    currentActor[currentActor.length - 1].valueOfEachActor =
      0.6 + 0.01 * currentActor[0].valueOfEachActor;
    newActors.splice(index, 1);
    const jsonActors = JSON.stringify(newActors);
    localStorage.setItem("KTCN", jsonActors);
    setActors(newActors);
  };

  var amount = 0;
  actors.forEach((element) => {
    amount += parseInt(element.valueOfEachActor);
  });
  const currentActor = [...actors];
  const a = currentActor[currentActor.length - 1].valueOfEachActor;
  setTCF(a);
  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>TT</th>
              <th>Các Hệ Số</th>
              <th>Trọng Số</th>
              <th>Giá Trị Xếp Hạng</th>
              <th>Kết Quả</th>
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
            {/* <tr>
              <td></td>
              <td></td>
              <td>TAW</td>
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
          placeholder="Trọng Số"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="numberOfActors"
          required="required"
          placeholder="Giá Trị Xếp Hạng"
          onChange={handleAddFormChange}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default KTCN;
