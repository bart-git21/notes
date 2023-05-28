import {
    editNote,
    getEditingTarget,
} from "./updateNote.js";


const notesWrapper = document.querySelector('.notesWrapper');
const template = document.querySelector('template');



async function appendNoteToScreen(title, showDate, date, modalMessages, messagesDates) {
    const htmlFragment = await createHtmlClone(title, showDate, date, modalMessages, messagesDates);
    notesWrapper.appendChild(htmlFragment);
}
function createHtmlClone(title, showDate, date, modalMessages, messagesDates) {
    const clone = template.content.cloneNode("true");
    clone.querySelector("h5").textContent = title;
    clone.querySelector(".noteShowDate").textContent = showDate;
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


class classShow {
    allNotes() {
        const notesList = JSON.parse(localStorage.getItem("notes"));
        notesWrapper.innerHTML = "";
        notesList.forEach(
            e =>  appendNoteToScreen(e.title, e.showDate, e.date, e.allNoteMessages, e.messages_dates)
        );
    };

    actualNotes(list) {
        // const notesList = JSON.parse(localStorage.getItem("notes"));
        notesWrapper.innerHTML = "";
        list.forEach( 
            e => (new Date(+e.showDate) <= Date.now()) 
                && ( appendNoteToScreen(e.title, e.showDate, e.date, e.allNoteMessages, e.messages_dates) )
        );
    }
}

const onShow = new classShow();
export default onShow