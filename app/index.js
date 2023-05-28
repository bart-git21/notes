import onShow from "./show.js";
document.querySelector("#showAllNotes").addEventListener("click", () => {onShow.allNotes()});

const notesList = JSON.parse(localStorage.getItem("notes"));
notesList && onShow.actualNotes(notesList);