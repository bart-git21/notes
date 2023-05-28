import onShow from "./show.js";

function updateList(editingElem, newNote) {
    let notesList = JSON.parse(localStorage.getItem("notes")) || [];
    if (editingElem) {
        const index = notesList.findIndex(e => e.messages_dates[0].toString() === editingElem.querySelector(".messageDate").textContent);
        newNote ? ( notesList[index] = newNote ) : ( notesList.splice(index, 1) )
    } else notesList.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notesList));

    onShow.actualNotes(notesList);
}

export {
    updateList,
};