import {
    updateList,
} from "./updateNotesList.js";

import {
    clearAndCloseNoteModal,
    closeDeleteModal,
    setModalBtnName,
    clearModalMessagesField,
    addNewInput,
    modalTitle,
    modalMessagesField,
    modalNoteShowDate,
    popoverTitle,
} from "./modal.js";



let popoverText = null;
let editingElem = null;


function clearEditingElem() {
    editingElem = null;
}
function getEditingTarget() {
    editingElem = this.parentElement.parentElement.parentElement;
}

// ====================== CRUD ===========================
// create the note
async function createAndSaveNote() {
    // check if string is not empty before creating a new note
    if (!modalTitle.value.trim()) {
        popoverTitle.show();
        modalTitle.focus();
    } else {
        popoverTitle.hide();

        const modalDateInputs = [...modalMessagesField.querySelectorAll('.messageDate')];
        const modalMsgInputs = [...modalMessagesField.querySelectorAll('.note__text')];
        for (let i = 0; i < modalMsgInputs.length; i++) {
            popoverText = new bootstrap.Popover(modalMsgInputs[i]);
            if (!modalMsgInputs[i].value.trim()) {
                popoverText.show();
                modalMsgInputs[i].focus();
                return
            }
        }


        // const date = modalNoteShowDate.textContent ? new Date(Date.parse(modalNoteShowDate.textContent)) : new Date();
        const date = modalNoteShowDate.textContent || Date.now().toString();
        // await appendNoteToScreen(modalTitle.value, date, date.toLocaleDateString(), modalMessages, modalDates);
        const newNote = {
            title: modalTitle.value,
            showDate: date,
            date: new Date(+date).toLocaleDateString(),
            allNoteMessages: modalMsgInputs.map(e => e.value),
            messages_dates: modalDateInputs.map(e => e.textContent),
        };
        updateList(editingElem, newNote);
        clearAndCloseNoteModal();
    };

}

// update the note
function getEditingShowDate() {
    modalNoteShowDate.textContent = editingElem.querySelector(".noteShowDate").textContent;
}
function getEditingTitle() {
    modalTitle.focus();
    modalTitle.value = editingElem.querySelector(".card-title").textContent;
}
function getEditingMessages() {
    const cardMessagesInputs = [...editingElem.querySelectorAll(".card-text")];
    const cardMessagesText = cardMessagesInputs.map(
        e => e.textContent
    )
    const cardDatesInputs = [...editingElem.querySelectorAll(".messageDate")];
    const cardDates = cardDatesInputs.map(
        e => e.textContent
    )
    clearModalMessagesField();
    cardMessagesText.forEach(
        (e, i) => addNewInput(e, cardDates[i])
    )
}
function editNote() {
    setModalBtnName(true);
    getEditingShowDate();
    getEditingTitle();
    getEditingMessages();
}

// delete the note
function deleteNote() {
    editingElem.remove();
    updateList(editingElem);
    closeDeleteModal();
}


export {
    deleteNote,
    editNote,
    getEditingTarget,
    clearEditingElem,
    createAndSaveNote,
};