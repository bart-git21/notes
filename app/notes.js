import {
    updateLocalStorage,
} from "./localstorage.js";
import {
    clearAndCloseNoteModal,
    closeDeleteModal,
    setModalBtnName,
    clearModalMessagesField,
    addNewInput,
    modalTitle,
    modalMessagesField,
    modalCreateNoteBtn,
    popoverTitle,
} from "./modal.js";

let popoverText = null;
const notesWrapper = document.querySelector('.notesWrapper');
const template = document.querySelector('template');
let editingElem = null;


// Note UI
async function appendNoteToScreen(title, date, modalMessages) {
    const htmlFragment = await createHtmlClone(title, date, modalMessages);
    notesWrapper.appendChild(htmlFragment);
}
function createHtmlClone(title, date, modalMessages) {
    const clone = template.content.cloneNode("true");
    clone.querySelector("h5").textContent = title;
    clone.querySelector(".noteDate").textContent = date;
    modalMessages.forEach(
        e => {
            clone.querySelector(".card-body").insertAdjacentHTML("beforeend", `
            <div class="card-text">${e}</div>
            `);
        }
    )
    clone.querySelector(".noteEditor").addEventListener("click", getEditingTarget);
    clone.querySelector(".noteEditor").addEventListener("click", editNote);
    clone.querySelector(".noteDeleteBtn").addEventListener("click", getEditingTarget);

    return new Promise(
        res => {
            setTimeout(() => {
                res(clone)
            }, 200)
        }
    )
}



// game logic

function getEditingTarget() {
    editingElem = this.parentElement.parentElement.parentElement;
}

modalCreateNoteBtn.addEventListener("click", async function () { await createAndSaveNote() });
async function createAndSaveNote() {
    // check if string are not empty before creating a new note
    if (!modalTitle.value) {
        popoverTitle.show();
        modalTitle.focus();
    } else {
        popoverTitle.hide();
        
        const modalMsgInputs = [...modalMessagesField.querySelectorAll('.note__text')];
        for (let i = 0; i < modalMsgInputs.length; i++) {
            popoverText = new bootstrap.Popover(modalMsgInputs[i]);
            if (!modalMsgInputs[i].value) {
                popoverText.show();
                modalMsgInputs[i].focus();
                return
            }
        }
        const modalMessages = modalMsgInputs.map(
            e => e.value
        )
        const date = new Date().toLocaleDateString();
        await appendNoteToScreen(modalTitle.value, date, modalMessages);

        // editing case
        editingElem && editingElem.remove();

        updateLocalStorage();
        clearAndCloseNoteModal();
    };

}

//delete the note
function deleteNote() {
    editingElem.remove();
    updateLocalStorage();
    closeDeleteModal();
}

// edit the note
function getEditingTitle() {
    modalTitle.focus();
    modalTitle.value = editingElem.querySelector(".card-title").textContent;
}
function getEditingMessages() {
    const cardMessagesInputs = [...editingElem.querySelectorAll(".card-text")];
    const cardMessagesText = cardMessagesInputs.map(
        e => e.textContent
    )
    clearModalMessagesField();
    cardMessagesText.forEach(
        e => addNewInput(e)
    )
}
function editNote() {
    setModalBtnName(true);
    getEditingTitle();
    getEditingMessages();
}


export {
    deleteNote,
    appendNoteToScreen,
    notesWrapper,
};