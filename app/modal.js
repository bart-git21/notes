import {
    deleteNote,
} from "./notes.js";

const noteModal = document.getElementById('noteModal');
const note__createNew = document.querySelector('.note__createNew');
const note__title = document.querySelector('.note__title');
const popoverTitle = new bootstrap.Popover(note__title);
const note__text = document.querySelector('.note__text');
const popoverText = new bootstrap.Popover(note__text);
const closeBtn = document.querySelector('.closeBtn');


// Delete Modal UX
const deleteModalDeleteBtn = document.querySelector('.deleteModalDeleteBtn');
const deleteModalCancelBtn = document.querySelector('.deleteModalCancelBtn');
deleteModalDeleteBtn.addEventListener("click", deleteNote);
function closeDeleteModal() {
    deleteModalCancelBtn.click();
}


// Note Modal UI
noteModal.addEventListener('show.bs.modal', () => {
    clearModal();
    setModalBtnName();
})
noteModal.addEventListener('shown.bs.modal', () => {
    note__title.focus();
})
function setModalBtnName(isEditing = false) {
    note__createNew.textContent = isEditing ? "Save" : "Create Note";
}

// Note Modal UX
function clearAndCloseNoteModal() {
    clearModal();
    closeBtn.click();
}
function clearModal() {
    note__title.value = "";
    note__text.value = "";
}

export {
    clearAndCloseNoteModal,
    closeDeleteModal,
    setModalBtnName,
    note__title,
    note__text,
    note__createNew,
    popoverTitle,
    popoverText
};