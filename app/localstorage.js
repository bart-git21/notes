function updateLocalStorage() {
    let arr = [];
    const cards = document.querySelectorAll(".card");
    cards.forEach(
        e => {
            arr.push(
                {
                    title: e.children[0].children[1].children[0].textContent,
                    date: e.children[0].children[1].children[1].textContent,
                    text: e.children[1].children[0].textContent,
                }
            );
        }
    );

    localStorage.setItem("notes", JSON.stringify(arr));
}

export {
    updateLocalStorage,
};