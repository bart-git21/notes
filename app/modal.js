import {
    deleteNote,
    clearEditingElem,
    createAndSaveNote,
} from "./updateNote.js";

import onShow from "./show.js";

const noteModal = document.getElementById('noteModal');
const modalMessagesField = document.querySelector('.modalMessagesField');
const modal__addNewInput = document.querySelector('.modal__addNewInput');
const modalCreateNoteBtn = document.querySelector('.modalCreateNoteBtn');
const modalTitle = document.querySelector('.modalTitle');
const popoverTitle = new bootstrap.Popover(modalTitle);
const closeBtn = document.querySelector('.closeBtn');
const modalNoteShowDate = document.querySelector(".modalNoteShowDate");
const modalToggleShowtimerBtn = document.querySelector("#modalToggleShowtimerBtn");

function removeParent() {    
    this.parentElement.remove();
}
function getMessageDate() {
    this.previousElementSibling.textContent = new Date().toLocaleString();
}


// Delete Modal UX
const deleteModalDeleteBtn = document.querySelector('.deleteModalDeleteBtn');
const deleteModalCancelBtn = document.querySelector('.deleteModalCancelBtn');
deleteModalDeleteBtn.addEventListener("click", deleteNote);
function closeDeleteModal() {
    deleteModalCancelBtn.click();
}


// Note Modal UI
noteModal.addEventListener('show.bs.modal', () => {
    clearModalInputs();
    setModalMessageDate();
    setModalBtnName();
});
noteModal.addEventListener('shown.bs.modal', () => {
    modalTitle.focus();
});
function setModalBtnName(isEditing = false) {
    modalCreateNoteBtn.textContent = isEditing ? "Save" : "Create Note";
};
noteModal.addEventListener('hide.bs.modal', clearEditingElem);

// Note Modal UX
modalCreateNoteBtn.addEventListener("click", async function () { await createAndSaveNote() });

function clearAndCloseNoteModal() {
    clearModalInputs();
    closeBtn.click();
}
function clearModalInputs() {
    modalTitle.value = "";
    modalMessagesField.innerHTML = null;
    modalNoteShowDate.textContent = "";
    modalToggleShowtimerBtn.value = 0;
    addNewInput();
}

function setModalDelBtn() {
    [...modalMessagesField.querySelectorAll('.modal__deleteThisInput')].forEach(
        e => e.addEventListener("click", removeParent)
    )
}
function setModalMessageDate() {
    [...modalMessagesField.querySelectorAll('.note__text')].forEach(
        e => e.addEventListener("input", getMessageDate)
    )
}
function addNewInput(text="", date="") {
    modalMessagesField.insertAdjacentHTML("beforeend", `
        <div class="input-group mb-3">
            <div class="invisible messageDate">${date}</div>
            <input 
            type="text" 
            class="form-control note__text" 
            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
            data-bs-content="Please, enter the message"
            placeholder="Enter your message"
            value="${text}">
            <button type="button" class="btn btn-outline-danger fw-bold modal__deleteThisInput" title="delete this message">
                <i class="fa-solid fa-scissors"></i>
            </button>
        </div>
    `);
    
    const modalMsgInputs = [...modalMessagesField.querySelectorAll('.note__text')];
    modalMsgInputs[modalMsgInputs.length - 1].focus();
    
    setModalMessageDate();
    setModalDelBtn();
}
function clearModalMessagesField() {
    modalMessagesField.innerHTML = null;
}
modal__addNewInput.addEventListener("click", function(){addNewInput()});



modalToggleShowtimerBtn.addEventListener("change", () => updateShowtimer());
function updateShowtimer() {
    // modalNoteShowDate.textContent = new Date(+modalToggleShowtimerBtn.value + Date.now());
    modalNoteShowDate.textContent = (+modalToggleShowtimerBtn.value + Date.now()).toString();
    setTimeout(()=>{onShow.actualNotes(JSON.parse(localStorage.getItem("notes")))}, +modalToggleShowtimerBtn.value + 100);
}



export {
    clearAndCloseNoteModal,
    closeDeleteModal,
    setModalBtnName,
    clearModalMessagesField,
    addNewInput,
    modalTitle,
    modalMessagesField,
    modalCreateNoteBtn,
    modalNoteShowDate,
    modalToggleShowtimerBtn,
    noteModal,
    popoverTitle,
};