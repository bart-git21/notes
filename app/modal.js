import {
    deleteNote,
} from "./notes.js";

const noteModal = document.getElementById('noteModal');
const modalMessagesField = document.querySelector('.modalMessagesField');
const modal__addNewInput = document.querySelector('.modal__addNewInput');
const modalCreateNoteBtn = document.querySelector('.modalCreateNoteBtn');
const modalTitle = document.querySelector('.modalTitle');
const popoverTitle = new bootstrap.Popover(modalTitle);
const closeBtn = document.querySelector('.closeBtn');

function removeParent() {    
    this.parentElement.remove();
}
function getDate() {
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
})
noteModal.addEventListener('shown.bs.modal', () => {
    modalTitle.focus();
})
function setModalBtnName(isEditing = false) {
    modalCreateNoteBtn.textContent = isEditing ? "Save" : "Create Note";
}

// Note Modal UX
function clearAndCloseNoteModal() {
    clearModalInputs();
    closeBtn.click();
}
function clearModalInputs() {
    modalTitle.value = "";
    modalMessagesField.querySelector('.note__text').value = "";
}

function setModalDelBtn() {
    const modalDelBtn = [...modalMessagesField.querySelectorAll('.modal__deleteThisInput')];
    modalDelBtn.forEach(
        e => e.addEventListener("click", removeParent)
    )
}
function setModalMessageDate() {
    [...modalMessagesField.querySelectorAll('.note__text')].forEach(
        e => e.addEventListener("input", getDate)
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
            placeholder="Enter your next message"
            value="${text}">
            <button type="button" class="btn btn-primary fw-bold modal__deleteThisInput" title="delete this message">
                <i class="fa-solid fa-scissors"></i>
            </button>
        </div>
    `);
    setModalMessageDate();
    setModalDelBtn();
}
function clearModalMessagesField() {
    modalMessagesField.innerHTML = null;
}
modal__addNewInput.addEventListener("click", function(){addNewInput()});

export {
    clearAndCloseNoteModal,
    closeDeleteModal,
    setModalBtnName,
    clearModalMessagesField,
    addNewInput,
    modalTitle,
    modalMessagesField,
    modalCreateNoteBtn,
    popoverTitle,
};