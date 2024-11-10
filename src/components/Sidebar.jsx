import React, { useState, useEffect } from "react";
import "../css/sidebar.css";

function Sidebar({ storedData, onDataClick, togglepop }) {
  const [allInfoObjects, setAllInfoObjects] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const screenWidth = window.innerWidth;

  useEffect(() => {
    const storedNotesInfo = JSON.parse(localStorage.getItem("NotesInfo")) || {};
    const infoArray = Object.values(storedNotesInfo);
    setAllInfoObjects(infoArray);
  }, [storedData]);

  const handlenotesadder = (info) => {
    let x = info.infogn.groupName;
    const y = info.infogn.selectedColor;
    setSelectedRadio(x);
    onDataClick({ x, y });
  };

  const popupopener = () => {
    togglepop();
  };

  return (
    <div className="Sidebarmain">
      <h1 className="sticky-header">Pocket Notes</h1>
      <div>
        {allInfoObjects.map((info, index) => (
          <div key={index}>
            <div
              className={`notesInfolist ${
                selectedRadio === info.infogn.groupName ? "active" : ""
              }`}
              onClick={() => handlenotesadder(info)}
            >
              <div className="initials" style={{ backgroundColor: `${info.infogn.selectedColor}` }}>
                {info.infogn.groupName
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="initialsff">{info.infogn.groupName}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="create-group-button" onClick={popupopener}>
        +
      </button>
    </div>
  );
}

export default Sidebar;
