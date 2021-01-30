import React, { useState } from "react";
import NoteListing from "../NoteListing/NoteListing";
import "./NoteEntry.css";
const NoteEntry = () => {
  const [editData, setEditData] = useState();
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [state, setState] = useState({
    title: "",
    note: "",
  });

  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };
  const handleSubmit = () => {
    let store = JSON.parse(localStorage.getItem("list"));
    if (editData) {
      store.map((value) => {
        if (value.id === editData.id) {
          value.title = state.title;
          value.note = state.note;
        }
      });
      localStorage.setItem("list", JSON.stringify(store));
      setList(store);
      setState({
        title: "",
        note: "",
      });
      setEditData(false);
    } else {
      if (store.some((item) => item.title === state.title)) {
        alert("Title already exist");
      } else {
        let noteId = JSON.parse(localStorage.getItem("id"));
        noteId = noteId + 1;
        store.push({ id: noteId, title: state.title, note: state.note });
        localStorage.setItem("list", JSON.stringify(store));
        setList(store);
        localStorage.setItem("id", JSON.stringify(noteId));
        setState({
          title: "",
          note: "",
        });
      }
    }
  };
  const onDelete = (id) => {
    let prevList = list;
    prevList = prevList.filter((value) => value.id !== id);
    setList(prevList);
    localStorage.setItem("list", JSON.stringify(prevList));
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value) {
      let prevList = JSON.parse(localStorage.getItem("list"));
      prevList = prevList.filter((value) => value.title === event.target.value);
      setList(prevList);
    } else {
      setList(JSON.parse(localStorage.getItem("list")));
    }
  };
  return (
    <div style={{ flexDirection: "column" }}>
      <div>
        <input
          type="text"
          name="title"
          value={state.title}
          onChange={handleChange}
          placeholder="Title"
        />
      </div>
      <div>
        <textarea
          name="note"
          value={state.note}
          onChange={handleChange}
          placeholder="Note"
        />
      </div>
      <div>
        <button
          onClick={() =>
            state.title ? handleSubmit() : alert("Tile is mandatory")
          }
        >
          Add
        </button>
      </div>
      <input
        type="text"
        name="search"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search"
      />
      <NoteListing
        list={list}
        onDelete={(id) => onDelete(id)}
        editNote={(value) => {
          setState({
            title: value.title,
            note: value.note,
          });
          setEditData(value);
        }}
      />
    </div>
  );
};

export default NoteEntry;
