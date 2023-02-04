function updateLocalStorage() {
    let arr = [];
    const cards = document.querySelectorAll(".card");
    cards.forEach(
        e => {
            const cardsMessages = [...e.querySelectorAll('.card-text')];
            const messagesText = cardsMessages.map(
                e => e.textContent
            )
            const messagesDatesDivs = [...e.querySelectorAll('.messageDate')];
            const messagesDates = messagesDatesDivs.map(
                e => e.textContent
            )
            arr.push(
                {
                    title: e.children[0].children[1].children[0].textContent,
                    date: e.children[0].children[1].children[1].textContent,
                    allNoteMessages: messagesText,
                    messages_dates:messagesDates,
                }
            );
        }
    );

    localStorage.setItem("notes", JSON.stringify(arr));
}

export {
    updateLocalStorage,
};