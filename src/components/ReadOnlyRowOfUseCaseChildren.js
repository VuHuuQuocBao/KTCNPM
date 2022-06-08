import React from "react";

const ReadOnlyRow = ({
  indexOfParent,
  actor,
  handleEditClick,
  handleDeleteChildrenClick,
}) => {
  return (
    <tr>
      <td></td>
      <td>{actor.name}</td>
      <td>{actor.numberOfActors}</td>
      <td>{actor.valueOfEachActor}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, actor)}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => handleDeleteChildrenClick(indexOfParent, actor.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
