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
    noteModal,
    popoverTitle,
} from "./modal.js";

let popoverText = null;
const notesWrapper = document.querySelector('.notesWrapper');
const template = document.querySelector('template');
let editingElem = null;


// Note UI
async function appendNoteToScreen(title, date, modalMessages, messagesDates) {
    const htmlFragment = await createHtmlClone(title, date, modalMessages, messagesDates);
    notesWrapper.appendChild(htmlFragment);
}
function createHtmlClone(title, date, modalMessages, messagesDates) {
    const clone = template.content.cloneNode("true");
    clone.querySelector("h5").textContent = title;
    clone.querySelector(".noteDate").textContent = date;
    modalMessages.forEach(
        (e, i) => {
            clone.querySelector(".card-body").insertAdjacentHTML("beforeend", `
            <div class="input-group mb-3 d-flex flex-column">
                <div class="me-3 fw-light messageDate">${messagesDates[i]}</div>
                <div class="card-text">${e}</div>
            </div>
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

noteModal.addEventListener('hide.bs.modal', () => {
    editingElem = null;
})
function getEditingTarget() {
    editingElem = this.parentElement.parentElement.parentElement;
}

modalCreateNoteBtn.addEventListener("click", async function () { await createAndSaveNote() });
async function createAndSaveNote() {
    // check if string are not empty before creating a new note
    if (!modalTitle.value.trim()) {
        popoverTitle.show();
        modalTitle.focus();
    } else {
        popoverTitle.hide();

        const modalMsgInputs = [...modalMessagesField.querySelectorAll('.note__text')];
        for (let i = 0; i < modalMsgInputs.length; i++) {
            popoverText = new bootstrap.Popover(modalMsgInputs[i]);
            if (!modalMsgInputs[i].value.trim()) {
                popoverText.show();
                modalMsgInputs[i].focus();
                return
            }
        }
        const modalMessages = modalMsgInputs.map(
            e => e.value
        )
        const modalDateInputs = [...modalMessagesField.querySelectorAll('.messageDate')];
        const modalDates = modalDateInputs.map(
            e => e.textContent
        )
        const date = new Date().toLocaleDateString();
        await appendNoteToScreen(modalTitle.value, date, modalMessages, modalDates);

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
    getEditingTitle();
    getEditingMessages();
}


export {
    deleteNote,
    appendNoteToScreen,
    notesWrapper,
};