import {
    updateLocalStorage,
} from "./localstorage.js";
import {
    clearAndCloseNoteModal,
    closeDeleteModal,
    setModalBtnName,
    note__title,
    note__text,
    note__createNew,
    popoverTitle,
    popoverText,
} from "./modal.js";


const notesWrapper = document.querySelector('.notesWrapper');
const template = document.querySelector('template');
let editingElem = null;


// Note UI
async function appendNoteToScreen(title, text, date) {
    const htmlFragment = await createHtmlClone(title, text, date);
    notesWrapper.appendChild(htmlFragment);
}
function createHtmlClone(title, text, date) {
    const clone = template.content.cloneNode("true");
    clone.querySelector("h5").textContent = title;
    clone.querySelector(".noteDate").textContent = date;
    clone.querySelector("p").textContent = text;
    clone.querySelector(".noteEditor").addEventListener("click", editNote);
    // clone.querySelector(".noteDeleteBtn").addEventListener("click", deleteNote);
    clone.querySelector(".noteDeleteBtn").addEventListener("click", getEditingTarget);

    return new Promise(
        res => {
            setTimeout(()=>{
                res(clone)
            }, 200)
        }
    )
}



// game logic

note__createNew.addEventListener("click", async function() {await createAndSaveNote()});

function getEditingTarget(e) {
    editingElem = e.target.parentElement.parentElement.parentElement;
}

async function createAndSaveNote() {
    // check if string are not empty before creating a new note
    if (!note__title.value) {
        popoverText.hide();
        popoverTitle.show();
        note__title.focus();
    } else if (!note__text.value) {
        popoverTitle.hide();
        popoverText.show();
        note__text.focus();
    } else {
        popoverTitle.hide();
        popoverText.hide();

        const date = new Date().toLocaleDateString();
        await appendNoteToScreen(note__title.value, note__text.value, date);

        updateLocalStorage();
        clearAndCloseNoteModal();
    };

    // editing case
    if (editingElem) {
        editingElem.remove();
        updateLocalStorage();
    }
}
function deleteNote() {
    editingElem.remove();
    updateLocalStorage();
    closeDeleteModal();
}
function editNote(e) {
    getEditingTarget(e);
    setModalBtnName(true);

    note__title.focus();
    note__title.value = editingElem.querySelector(".card-title").textContent;
    note__text.value = editingElem.querySelector(".card-text").textContent;
}

export {
    deleteNote,
    appendNoteToScreen,
    notesWrapper,
};