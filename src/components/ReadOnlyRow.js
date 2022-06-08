import React from "react";

const ReadOnlyRow = ({ index, actor, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{actor.id}</td>
      <td>{actor.name}</td>
      <td>{actor.description}</td>
      <td>{actor.numberOfActors}</td>
      <td>{actor.valueOfEachActor}</td>
      <td>{actor.note}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, actor)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(actor.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
