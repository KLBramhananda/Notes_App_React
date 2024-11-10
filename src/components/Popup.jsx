import React, { useState, useEffect } from "react";
import "../css/popup.css";
const Popup = ({ onFormSubmit, togglepops }) => {
  const [card, setCard] = useState(false); 
  const [groupName, setGroupName] = useState(""); 
  const [selectedColor, setSelectedColor] = useState(""); 
  const [noteinfo, setNoteInfo] = useState(" ");
  const [notesinfo, setNotesInfo] = useState([]);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      if (groupName === "" || selectedColor === "") {
        throw new Error("Please Fill all the Fields"); 
      }
      const newNoteInfo = { groupName, selectedColor };

      const storedNotesInfo =
        JSON.parse(localStorage.getItem("NotesInfo")) || {}; 
      storedNotesInfo[groupName] = { infogn: newNoteInfo };
      localStorage.setItem("NotesInfo", JSON.stringify(storedNotesInfo)); 
      setNotesInfo([...notesinfo, newNoteInfo]);
      setNoteInfo("");

      onFormSubmit({ groupName, selectedColor }); 
      togglecardstate(); 
    } catch (error) {
      console.error("An error caught");
      console.error("Error message: " + error.message);
      alert(error.message);
    }
  };

  const togglecardstate = () => {
    togglepops();
   
    setGroupName("");
    setSelectedColor("");
  };
  const stopPropagation = (event) => {
    event.stopPropagation(); 
  };

  return (
    <div
      className={`popupbody ${card ? "active-modal" : ""}`}
      onClick={togglecardstate}
    >
      <div className="popupcard" onClick={stopPropagation}>
        <div className="popupcardsub00">
          <div className="popupcardsub" id="poph">
            Create New Notes group
          </div>
          <div className="popupcardsub">
            <label>
              Group Name{" "}
              <input
                type="text"
                name="myCheckbox"
                placeholder="Enter your group name..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </label>
          </div>
          <div className="popupcardsub">
            <label>
              Choose colour
              <input
                type="radio"
                name="myCheckbox"
                style={{ backgroundColor: "var(--c1)" }}
                onChange={() => setSelectedColor("var(--c1)")}
              />
              <input
                type="radio"
                name="myCheckbox"
                style={{ backgroundColor: "var(--c2)" }}
                onChange={() => setSelectedColor("var(--c2)")}
              />
              <input
                type="radio"
                name="myCheckbox"
                style={{ backgroundColor: "var(--c3)" }}
                onChange={() => setSelectedColor("var(--c3)")}
              />
              <input
                type="radio"
                name="myCheckbox"
                style={{ backgroundColor: "var(--c4)" }}
                onChange={() => setSelectedColor("var(--c4)")}
              />
              <input
                type="radio"
                name="myCheckbox"
                style={{ backgroundColor: "var(--c5)" }}
                onChange={() => setSelectedColor("var(--c5)")}
              />
              <input
                type="radio"
                name="myCheckbox"
                style={{ backgroundColor: "var(--c6)" }}
                onChange={() => setSelectedColor("var(--c6)")}
              />
            </label>
          </div>
        </div>
        <div className="popupcardsub00" id="btnpopup">
          <button id="pop-btn" onClick={handleFormSubmit}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
