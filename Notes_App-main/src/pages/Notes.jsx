import React, { useState, useEffect } from "react";
import Notesadder from "../components/Notesadder";
import Popup from "../components/Popup";
import Sidebar from "../components/Sidebar";

function Notes() {
  const [storedData, setStoredData] = useState(null);
  const [selectedX, setSelectedX] = useState({ x: "", y: "" });
  const [showPopup, setShowPopup] = useState(false);
  const handleNoteSelection = ({ x, y }) => {
    setSelectedX({ x, y });
  };

  const handleFormSubmit = ({ groupName, selectedColor }) => {
    setStoredData({ groupName, selectedColor });
  };
  const handletoggle = () => {
    setShowPopup(!showPopup);
  };
  useEffect(() => {
    const storedNotesInfo = localStorage.getItem("NotesInfo");

    if (storedNotesInfo == null) {
      setShowPopup(true);
    }
  }, []);
  return (
    <div className="mainbody">
      {showPopup && (
        <Popup onFormSubmit={handleFormSubmit} togglepops={handletoggle} />
      )}
      <Sidebar
        storedData={{ storedData }}
        onDataClick={handleNoteSelection}
        togglepop={handletoggle}
      />
      <Notesadder selectedX={selectedX} />
    </div>
  );
}

export default Notes;
