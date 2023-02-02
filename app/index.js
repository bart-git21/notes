import {
    appendNoteToScreen,
    notesWrapper,
} from "./notes.js";

const notes = JSON.parse(localStorage.getItem("notes"));


function startPoint() {    
    notesWrapper.innerHTML = "";
    notes.forEach(
        e => appendNoteToScreen(e.title, e.text, e.date)
    )
}
if (notes) {
    startPoint();
}
