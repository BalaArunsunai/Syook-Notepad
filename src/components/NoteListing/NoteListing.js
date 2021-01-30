import React from "react";
import "./NoteListing.css";
const NoteListing = (props) => {
  const { editNote, list, onDelete } = props;
  return (
    <div>
      {list.length > 0 &&
        list.map((value) => (
          <div class="card">
            <div style={{ flexDirection: "row", marginTop: 10, float: 'right' }}>
              <button class="button2" onClick={() => editNote(value)}>
                Edit
              </button>
              <button class="button3" onClick={() => onDelete(value.id)}>
                Delete
              </button>
            </div>
            <div class="container">
              <p >
                <b>{value.title}</b>
              </p>
              <p >{value.note}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NoteListing;
