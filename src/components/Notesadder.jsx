import React, { useState, useEffect } from "react";
import "../css/noteadder.css";
import arrow from "../assets/arrowback.svg";
import send from "../assets/send.svg";
import bg from "../assets/bg.png";
import lock from "../assets/lock.svg";

const Notesadder = ({ selectedX }) => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [key, setKey] = useState("");
  const [yValue, setYValue] = useState("");
  const screenWidth = window.innerWidth;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.trim() !== "") {
      const currentDate = new Date();
      const formattedDate = currentDate
        .toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
        .replace(/ /g, " ");
      const formattedTime = currentDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const timestamp = `${formattedDate} • ${formattedTime}`;
      const newNote = { text: note, timestamp: timestamp };

      const storedNotesInfo =
        JSON.parse(localStorage.getItem("NotesInfo")) || {};

      if (!storedNotesInfo[key]) {
        storedNotesInfo[key] = { infogn: {}, notesgn: [] };
      }

      if (!Array.isArray(storedNotesInfo[key].notesgn)) {
        storedNotesInfo[key].notesgn = [newNote];
      } else {
        storedNotesInfo[key].notesgn.push(newNote);
      }

      localStorage.setItem("NotesInfo", JSON.stringify(storedNotesInfo));
      setNotes([...notes, newNote]);
      setNote("");
    }
  };

  useEffect(() => {
    const storedNotesInfo = JSON.parse(localStorage.getItem("NotesInfo")) || {};
    if (
      storedNotesInfo[selectedX.x] &&
      Array.isArray(storedNotesInfo[selectedX.x].notesgn)
    ) {
      setNotes(storedNotesInfo[selectedX.x].notesgn);
    } else {
      setNotes([]);
      setKey(null);
    }
    setKey(selectedX.x);
    setYValue(selectedX.y);
  }, [selectedX]);

  const handlearrow = () => {
    const popupbody = document.querySelector(".noteaddermainbody");
    const sideb = document.querySelector(".Sidebarmain");
    setKey("");
    if (screenWidth < 701) {
      sideb.style.display = "block";
      popupbody.style.display = "none";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="noteaddermainbody">
      <div className="bydeftextarea">
        {key === "" && (
          <div className="bydeftextarea1">
            <div className="bg-info">
              <img src={bg} />
              <h1>Pocket Notes</h1>
              <h2>
                Send and receive messages without keeping your phone online. Use
                Pocket Notes on up to 4 linked devices and 1 mobile phone
              </h2>
              <span
                style={{ position: "absolute", bottom: "10px", left: "44%" }}
              >
                <img src={lock} alt="" />{" "}
                <label
                  style={{
                    fontSize: "large",
                    marginLeft: "5px",
                    fontWeight: "bolder",
                  }}
                >
                  end-to-end encrypted
                </label>
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="notesadder">
        <div className="notesInfolist">
          <div className="arrowback notesadders" onClick={handlearrow}>
            <img id="imgarr" src={arrow} />
          </div>
          <div
            className="initials"
            style={{ backgroundColor: `${selectedX.y}` }}
          >
            {getInitials(selectedX.x)}
          </div>
          <div className="initialsff" style={{ color: "#FFFFFF" }}>{key}</div>
        </div>
      </div>

      <div className="NotesaddContainer">
        <div className="Notesadd">
          {notes.map((note, index) => (
            <div className="noteBox" key={index}>
              <div className="noteText">{note.text}</div>
              <div className="noteTimestamp">{note.timestamp}</div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="formofnotes">
        <textarea
          className="notestext"
          type="textarea"
          placeholder="Enter your text here.........."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          className={`notesbutton ${note.trim() ? "active" : ""}`}
          type="submit"
        >
          <img src={send} alt="Send" />
        </button>
      </form>
    </div>
  );
};

export default Notesadder;
