let selectedCard = null;

export function dragAndDrop() {
    //* ######## Attribution drag a l'element task et verification si elle est deja initialiser via dndInit
  document.querySelectorAll(".cardTask").forEach(card => {
    if (card.dataset.dndInit === "1") return;
    card.draggable = true;

    //* ######## Stoquage dans une variable de l'element en cours de deplacement 
    card.addEventListener("dragstart", (e) => {
      selectedCard = e.currentTarget;
      e.dataTransfer.setData("text/plain", selectedCard.id);
    });

    //* ######## Renitialisation de la variable selectedCard
    card.addEventListener("dragend", () => {
      selectedCard = null;
    });

    //* ######## Ajout de l'attributs dataInit pour ne pas reiterer la function
    card.dataset.dndInit = "1";
  });

    //* ######## boucler sur toute les listes et verification si elle est deja initialiser via dndInit
  document.querySelectorAll(".taskFolder").forEach(folder => {
    if (folder.dataset.dndInit === "1") return;

    //* ######## Attribution dragOver a l'element list (folder)
    folder.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    //* ######## Attribution drop a l'element list (folder)
    folder.addEventListener("drop", (e) => {
      e.preventDefault();
      if (!selectedCard) return;

    //* ######## Recuperation de l'element qui contient les tasks return si rien est trouver
      const innerFolder = folder.querySelector(".inTaskFolder");
      if (!innerFolder) return;

    //* ######## Deplacement de la carte au niveau du DOM
      innerFolder.appendChild(selectedCard);

    //* ######## Recuperation des id parent et task
      const newParentId = Number(innerFolder.id);
      const movedTaskId = Number(selectedCard.id);

    //* ######## Modification dans le localStorage 
      const tasks = JSON.parse(localStorage.getItem("task")) || [];
      const idx = tasks.findIndex(t => Number(t.taskId) === movedTaskId);
      if (idx !== -1) {
        tasks[idx].parent = newParentId;
        localStorage.setItem("task", JSON.stringify(tasks));
      }

      selectedCard = null;
    });
    
    folder.dataset.dndInit = "1";
  });
}
