import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "../App.css";
import data from "../mock-data-usecase.json";
import ReadOnlyRowOfUseCase from "../components/ReadOnlyRowOfUseCase";
import EditableRowOfUseCase from "../components/EditableRowOfUseCase";
import ReadOnlyRowOfUseCaseChildren from "../components/ReadOnlyRowOfUseCaseChildren";
import EditableRowOfUseCaseChildren from "../components/EditableRowOfUseCaseChildren";

import Context from "../Store/Context";

function UseCase() {
  const { TBF, setTBF } = React.useContext(Context);

  const [mainUseCase, setMainUseCase] = useState("123");
  const [actors, setActors] = useState(() => {
    const storageActors = JSON.parse(localStorage.getItem("usecases"));
    return storageActors || data;
  });
  const [addFormData, setAddFormData] = useState({
    name: "",
    description: "",
    numberOfActors: 0,
    valueOfEachActor: 0,
    children: [],
    note: "",
  });

  // const addFormData1 = {
  //   name: "",
  //   description: "",
  //   numberOfActors: 0,
  //   valueOfEachActor: 0,
  //   children: [],
  //   note: "",
  // };

  // const addFormData1 = addFormData;

  // const testArray = [];
  // const [someothing, setSomething] = useState([]);

  // const [something, setSomething1] = useState([
  //   {
  //     name: "",
  //     children: [1],
  //   },
  // ]);

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
    console.log(event);

    console.log(addFormData);

    const newActor = {
      id: actors.length + 1,
      name: addFormData.name,
      description: addFormData.description,
      numberOfActors: addFormData.numberOfActors,
      valueOfEachActor: addFormData.valueOfEachActor,
      children: addFormData.children,
      note: addFormData.note,
    };

    const newActors = [...actors, newActor];
    const jsonActors = JSON.stringify(newActors);
    localStorage.setItem("usecases", jsonActors);
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
    localStorage.setItem("usecases", jsonActors);
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
    localStorage.setItem("usecases", jsonActors);
    setActors(newActors);
  };

  const handleDeleteChildrenClick = (indexOfParent, actorId) => {
    const newActors = [...actors];

    const index = newActors[indexOfParent].children.findIndex(
      (child) => child.id === actorId
    );

    // tinh' toan' lai
    newActors[indexOfParent].numberOfActors -=
      newActors[indexOfParent].children[index].numberOfActors;
    newActors[indexOfParent].valueOfEachActor -=
      newActors[indexOfParent].children[index].valueOfEachActor;

    newActors[indexOfParent].children.splice(index, 1);
    // newActors[index].children = [];

    // const a = newActors[indexOfParent].numberOfActors;
    const jsonActors = JSON.stringify(newActors);
    localStorage.setItem("usecases", jsonActors);
    setActors(newActors);
  };

  // const total = amount.toLocaleString("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  const handleUseCaseToMainUseCase = (event) => {
    event.preventDefault();
    actors.forEach((actor) => {
      if (actor.name == mainUseCase) {
        console.log(addFormData);
        const newChildren = {
          id: nanoid(),
          name: addFormData.name,
          description: addFormData.description,
          numberOfActors: addFormData.numberOfActors,
          valueOfEachActor: addFormData.valueOfEachActor,
          children: [],
          // children: testArray,
          // children: something.children,
          // khong hieu kieu gi' no' thanh loop trong children ( tham chieu' ??)
          // children: addFormData.children,
          // child: addFormData1.children,
          note: addFormData.note,
        };
        console.log(addFormData);
        console.log("newchildren la");
        console.log(newChildren);
        // const newActors = [...actors, newActor];
        // addFormData.id = nanoid();
        // actor.children.push(addFormData);
        const currentActor = actor;
        currentActor.children.push(newChildren);
        var currentNumberOfUseCase = parseInt(currentActor.numberOfActors);
        var currentValueOfEachUseCase = parseInt(currentActor.valueOfEachActor);
        currentNumberOfUseCase += parseInt(newChildren.numberOfActors);
        currentValueOfEachUseCase += parseInt(newChildren.valueOfEachActor);
        // currentActor.children.forEach((child) => {
        //   currentNumberOfUseCase += parseInt(child.numberOfActors);
        //   currentValueOfEachUseCase += parseInt(child.valueOfEachActor);
        // });
        currentActor.numberOfActors = currentNumberOfUseCase;
        currentActor.valueOfEachActor = currentValueOfEachUseCase;
        // actor.children.push(newChildren);
        // console.log(actor);

        // gan' state cu~ vao' 1 bien' moi'
        const newActors = [...actors];
        console.log("state cu~ khi chua gan' children vao' actor'" + newActors);
        const index = actors.findIndex((actor) => actor.name === mainUseCase);

        // newActors[index] = actor;
        newActors[index] = currentActor;
        console.log("state moi' khi  gan' children vao' actor'" + newActors);
        // const jsonActors = JSON.stringify(newActors);
        // localStorage.setItem("actors", jsonActors);
        setActors(newActors);
      }
    });
  };
  // console.log(addFormData);
  // console.log(actors);

  var amount = 0;
  actors.forEach((element) => {
    amount += parseInt(element.valueOfEachActor);
  });

  setTBF(amount);

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>TT</th>
              <th>Loại Actor</th>

              <th>Số trường hợp sử dụng</th>
              <th>Điểm của từng loại trường hợp sử dụng</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {actors.map((actor, indexOfParent) => (
              <Fragment>
                {editActorId === actor.id ? (
                  <EditableRowOfUseCase
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRowOfUseCase
                    actor={actor}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
                {actor.children.length > 0 &&
                  actor.children.map((child) => (
                    <Fragment>
                      {editActorId === child.id ? (
                        <EditableRowOfUseCaseChildren
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRowOfUseCaseChildren
                          actor={child}
                          indexOfParent={indexOfParent}
                          handleEditClick={handleEditClick}
                          handleDeleteChildrenClick={handleDeleteChildrenClick}
                        />
                      )}
                    </Fragment>
                  ))}
              </Fragment>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td>TBF</td>
              <td>{amount}</td>
            </tr>
          </tbody>
        </table>
      </form>

      <h2>Add an Main UseCase</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Name"
          onChange={handleAddFormChange}
        />

        {/* <input
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
        /> */}

        <button type="submit">Add</button>
      </form>

      <h2>Add an UseCase</h2>
      <form onSubmit={handleUseCaseToMainUseCase}>
        <input
          type="text"
          name="nameOfMainUseCase"
          required="required"
          placeholder="NameOfMainUseCase"
          onChange={(e) => setMainUseCase(e.target.value)}
        />
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Name"
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

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default UseCase;

// khong de actors hoac usecases rieng thi' bi loi ???
// children bi vong lap vo tan
