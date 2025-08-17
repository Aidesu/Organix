export function dragAndDrop() {
    const cards = document.querySelectorAll(".cardTask");
    const lists = document.querySelectorAll(".taskFolder");

    cards.forEach(cardDiv => {
    cardDiv.draggable = true;

    cardDiv.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", "");
        let selected = e.target;

        lists.forEach(listDiv => {
            listDiv.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            listDiv.addEventListener("drop", function (e) {
                e.preventDefault();
                const innerFolder = listDiv.querySelector(".inTaskFolder");
                if (innerFolder) {
                    innerFolder.appendChild(selected);
                }
            });
        });
    });
});
}
