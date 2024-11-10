import React, { useState, useEffect } from "react";
import "../css/sidebar.css";
function Sidebar({ storedData, onDataClick, togglepop }) {
  const [allInfoObjects, setAllInfoObjects] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const screenWidth = window.innerWidth;
  useEffect(() => {
    const storedNotesInfo = JSON.parse(localStorage.getItem("NotesInfo")) || {};
    console.log("Stored Notes Info:", storedNotesInfo);
    const infoArray = Object.values(storedNotesInfo);
    setAllInfoObjects(infoArray);
  }, [storedData]);

  const popupbody = document.querySelector(".noteaddermainbody"); 
  const sideb = document.querySelector(".Sidebarmain"); 

  const handlenotesadder = (info) => {
    let x = info.infogn.groupName;
    const y = info.infogn.selectedColor;
    console.log(`This is x : ${x}`);

    setSelectedRadio(x);

    onDataClick({ x, y });
    if (screenWidth < 701) {
      sideb.style.display = "none";
    }
    popupbody.style.display = "flex";
  };

  const popupopener = () => {
    togglepop();
  };

  return (
    <div className="Sidebarmain">
      <div className="notesInfolist0">
        <h1>Pocket Notes</h1>
        <button onClick={popupopener}> + &emsp; Create Notes group</button>
      </div>
      <div>
        {allInfoObjects.map((info, index) => (
          <div key={index}>
            <div
              className={`notesInfolist ${
                selectedRadio === info.infogn.groupName ? "active" : ""
              }`}
              onClick={() => handlenotesadder(info)}
            >
              <div id="fill"></div>
              <input
                type="radio"
                name="sellist1"
                id="sellist1"
                checked={selectedRadio === info.infogn.groupName}
                style={{ display: "none" }}
              />
              <div
                className="initials"
                style={{ backgroundColor: `${info.infogn.selectedColor}` }}
              >
                {" "}
                {info.infogn.groupName.slice(0, 2).toUpperCase()}
              </div>
              <div className="initialsff">{info.infogn.groupName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
