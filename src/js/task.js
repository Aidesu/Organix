import { ADD_FOLDER_BTN } from "../../app.js";
import { dragAndDrop } from "./dragNDrop.js";
console.log("init from task.js");
const addFolderBtn = ADD_FOLDER_BTN;


const localTask = JSON.parse(localStorage.getItem("task")) || [];
const localList = JSON.parse(localStorage.getItem("list")) || [];

//* ######### Boucle dans le localSotrage pour la creation des elements 
localList.forEach(element => {
    folderTask(element.content, element.folderId, element.color);
});

if (localTask != null) {
    localTask.forEach(element => {
        TaskCard(element.parent, element.content, element.taskId, element.timeLeft, element.status); // passer l'id
    });
}

//* ########################### Create card function ###########################
function TaskCard(parent, taskText, taskId, timeLeft, status) {
const card = document.createElement("div");
const cardBody = document.createElement("div");
const cardPp = document.createElement("div");
const cardPpImg = document.createElement("img");
const cardContent = document.createElement("h3");
const btnSection = document.createElement("div");
const doBtn = document.createElement("button");
const calendarBtn = document.createElement("button")
const removeBtn = document.createElement("button");
const confirmRemoveYes = document.createElement("button");
const confirmRemoveNo = document.createElement("button");
const parentId = document.getElementById(parent)
const inCardTime = document.createElement("span");

timeLeft = timeLeft || null;
status = status;

parentId.appendChild(card);
card.appendChild(cardBody);
cardBody.append(cardPp,cardContent, btnSection);
cardPp.appendChild(cardPpImg);
btnSection.append(removeBtn, calendarBtn, doBtn);

if (timeLeft !== null){
    const currentTime = Date.now();
    const timeRemaining = timeLeft - currentTime;
    const daysLeft = timeRemaining / (1000 * 60 * 60 * 24);
    timeCard(daysLeft.toFixed(0));
}

card.classList.add("cardTask");
card.id = taskId;
cardBody.classList.add("cardBody");
cardPp.classList.add("cardProfPic");
btnSection.classList.add("btnSectionCard");
cardContent.textContent = taskText;

if (!status){
    statusNo()
}else {
    statusYes()
}
calendarBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#87878789"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>`;
removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#87878789"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;


cardPpImg.src = "https://i.pinimg.com/736x/b7/51/99/b75199056b5dd384275a7728f0fc289c.jpg";

confirmRemoveNo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a83131ff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
confirmRemoveYes.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3e9d38ff"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;

dragAndDrop();

//* ########################### Modification du contenu de la task ###########################
cardContent.addEventListener("dblclick", () => {

    const tasks = JSON.parse(localStorage.getItem("task")) || [];
    const currentText = cardContent.textContent;
    const editCardTitle = document.createElement("input");
    editCardTitle.classList.add("editTitle");
    editCardTitle.type = "text";
    editCardTitle.value = currentText;

    cardContent.replaceWith(editCardTitle);
    editCardTitle.focus();

//* ########################### Affecter la modification / supression  ###########################
    editCardTitle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && editCardTitle.value !== ""){
            const newTitle = editCardTitle.value;
            cardContent.textContent = newTitle;
            editCardTitle.replaceWith(cardContent);
            const idx = tasks.findIndex(t => t.taskId === taskId);
            if (idx !== -1) {
                tasks[idx].content = newTitle;
                localStorage.setItem("task", JSON.stringify(tasks));
            }
            return
        }else if (e.key === "Enter" && editCardTitle.value === ""){
            parentId.removeChild(card);
            const idx = tasks.findIndex(i => i.taskId === taskId);
                if (idx !== -1) {
                    tasks.splice(idx, 1);
                    localStorage.setItem("task", JSON.stringify(tasks));
                }
            return;
        }
    })
    
})


//* ########################### Boutton a cocher ###########################
doBtn.addEventListener("click", () => {
    const tasks = JSON.parse(localStorage.getItem("task")) || [];
    const idx = tasks.findIndex(i => i.taskId === taskId);

    if (idx === -1) return;

    tasks[idx].status = !tasks[idx].status;
    localStorage.setItem("task", JSON.stringify(tasks));

    if (tasks[idx].status) {
        statusYes();
    } else {
        statusNo();
    }
})
//* ######################## Function Modification du boutton a cocher ########################
function statusYes() {
    doBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`;
    cardContent.classList.add("strikethrough");
    card.removeChild(inCardTime);

}

function statusNo() {
    doBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>`;
    cardContent.classList.remove("strikethrough");
}

  //* ########################### Boutton calendrier ###########################
  calendarBtn.addEventListener("click", () => {
    const tasks = JSON.parse(localStorage.getItem("task")) || [];
    const dateInput = document.createElement("input");
    const timeRemaining = Date.now();

    dateInput.type = "date";
    dateInput.style.display = "none";
    cardBody.appendChild(dateInput);

    if (dateInput.showPicker) {
      dateInput.showPicker();
    } else {
      dateInput.click();
    }

//* ################ calcul du temps qu'il reste pour terminer la tache ################
    dateInput.addEventListener("change", () => {
      let deadLine = new Date(dateInput.value).getTime();
      const timeRemainingMs = deadLine - timeRemaining;
      let days = Math.floor(timeRemainingMs / (1000 * 60 * 60 * 24));
      const idx = tasks.findIndex(i => Number(i.taskId) === Number(taskId));

      if (idx !== -1){
        tasks[idx].timeLeft = deadLine;
        localStorage.setItem("task", JSON.stringify(tasks));
      }
      timeCard(days);
      console.log(days + " days left");
    });
  });
//* ################ Attribution du texte pour le temps restant ################
  function timeCard(time) {
    cardBody.after(inCardTime);
    if (time >= 0) {
      inCardTime.textContent = time + " days left";
      inCardTime.classList.remove("timeWarn");
        inCardTime.classList.remove("timeDanger");
      if (time < 2 && time >= 1) {
        inCardTime.classList.add("timeWarn");
        inCardTime.classList.remove("timeDanger");
        inCardTime.textContent = time + " day left";
      } else if (time < 1) {
        inCardTime.textContent = "Less a day left";
        inCardTime.classList.remove("timeWarn");
        inCardTime.classList.add("timeDanger");
      }
    } else {
      return;
    }
  }

  //* ################ Boutton supprimer vers la confimation ################
removeBtn.addEventListener("click", () => {
    btnSection.removeChild(removeBtn);
    btnSection.removeChild(doBtn);
    btnSection.removeChild(calendarBtn);
    btnSection.append(confirmRemoveNo, confirmRemoveYes);})

//* ################ confirmation de la supression de la taches ################
    confirmRemoveNo.addEventListener("click", () => {
btnSection.removeChild(confirmRemoveNo);
    btnSection.removeChild(confirmRemoveYes);
    btnSection.append(removeBtn, calendarBtn, doBtn)
})

confirmRemoveYes.addEventListener("click", () => {
    const cardId = card.id;
    removeTask(cardId);
    parentId.removeChild(card);
})
}
//* ######################### Function de supression des taches ###########################
function removeTask(idToRemove) {
    let tasks = JSON.parse(localStorage.getItem("task")) || [];
    const idNum = Number(idToRemove);
    tasks = tasks.filter(item => item.taskId !== idNum);

    localStorage.setItem("task", JSON.stringify(tasks));
}

function removeList(idToRemove) {
    let lists = JSON.parse(localStorage.getItem("list")) || [];
    let tasks = JSON.parse(localStorage.getItem("task")) || [];
    const idNum = Number(idToRemove);

    const newTasks = tasks.filter(i => Number(i.parent) !== idNum);

    const newLists = lists.filter(i => Number(i.folderId) !== idNum);
    
    localStorage.setItem("task", JSON.stringify(newTasks));
    localStorage.setItem("list", JSON.stringify(newLists));
}

//* ######################### Creation des listes (folder) #################################
function folderTask(name, folderId, colorId) {
    const taskFolderCard = document.createElement("div");
    const taskFolderRow = document.createElement("div");
    const taskFolderTitle = document.createElement("h3");
    const taskFolderBtnRow = document.createElement("div");
    const addTaskBtn = document.createElement("button");
    const taskFolderBtnColor = document.createElement("button");
    const taskFolderBtnSettings = document.createElement("button");
    const deleteList = document.createElement("button");
    const inTaskFolder = document.createElement("div");
    folderId = folderId || Date.now();

    taskFolderCard.classList.add("taskFolder");
    taskFolderRow.classList.add("taskFolderRow");
    taskFolderBtnRow.classList.add("buttonRow");
    inTaskFolder.classList.add("inTaskFolder");
    inTaskFolder.id = folderId;

    document.querySelector(".contentTasks").appendChild(taskFolderCard);
    taskFolderCard.append(taskFolderRow,inTaskFolder);
    taskFolderRow.append(taskFolderTitle, taskFolderBtnRow);
    taskFolderBtnRow.append(addTaskBtn, taskFolderBtnColor, taskFolderBtnSettings);

    taskFolderTitle.textContent = name;
    addTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>`
    taskFolderBtnColor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>`;
    taskFolderBtnSettings.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"height="25px"viewBox="0 -960 960 960"width="25px"fill="#e3e3e3"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>`;

    let color = 0;
    const colors = ["blue", "yellow", "orange", "purple", "pink", "green", "red"];
    taskFolderCard.classList.add(colors[colorId]);

    //* ################ Bouttons ajouter une tache ################

    addTaskBtn.addEventListener("click", () => {
        let taskId = Date.now();
        let tasks = JSON.parse(localStorage.getItem("task")) || [];
        const newTask = prompt("Ajouter une nouvelle tache :");

    if (newTask === "" || newTask === null){
        return;
    }

    //* ################ Ajout des taches dans le localStorage ################
    const task = {
        taskId: taskId,
        content: newTask,
        parent: folderId,
        timeLeft: null,
        status: false
    };
    tasks.push(task);
    localStorage.setItem("task", JSON.stringify(tasks));

    TaskCard(folderId, newTask, taskId);
    })

    //* ################ Changement de titre des listes ################

    taskFolderTitle.addEventListener("dblclick", () => {

        const lists = JSON.parse(localStorage.getItem("list")) || [];
        const currentTitle = taskFolderTitle.textContent;
        const editFolderTitle = document.createElement("input")
        editFolderTitle.classList.add("editTitleFolder");
        editFolderTitle.type = "text";
        editFolderTitle.value = currentTitle;

        taskFolderTitle.replaceWith(editFolderTitle);
        editFolderTitle.focus();

        editFolderTitle.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && editFolderTitle.value !== ""){
                const newFolderTitle = editFolderTitle.value;
                taskFolderTitle.textContent = newFolderTitle;
                editFolderTitle.replaceWith(taskFolderTitle);
                const idx = lists.findIndex(t => t.folderId === folderId);
                if (idx !== -1) {
                    lists[idx].content = newFolderTitle;
                    localStorage.setItem("list", JSON.stringify(lists));
                }
                return;
            }
            else if (e.key === "Enter" && editFolderTitle.value === ""){
                document.querySelector(".contentTasks").removeChild(taskFolderCard);
                return;
            }
        })
    })

    //* ########################### Settings btn ###########################
  let settings = false;
  taskFolderBtnSettings.addEventListener("click", () => {
    deleteList.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
    deleteList.id = "deleteListBtn";

    if (settings === false) {
      taskFolderBtnRow.removeChild(addTaskBtn);
      taskFolderBtnRow.removeChild(taskFolderBtnColor);
      taskFolderBtnSettings.before(deleteList);

      settings = true;
    } else {
      const deleteBtnFromId = document.querySelector("#deleteListBtn");
      taskFolderBtnRow.removeChild(deleteBtnFromId);
      taskFolderBtnRow.append(
        addTaskBtn,
        taskFolderBtnColor,
        taskFolderBtnSettings
      );
      settings = false;
    }
  });

//* ########################### deleteFolderBtn ###########################

        deleteList.addEventListener("click", () => {
            if (confirm(`Confirmez la supression de la liste` ) == true){
                const folderId = inTaskFolder.id;
                console.log(folderId);
                const parentClass = document.querySelector(".contentTasks")
                removeList(folderId);
                parentClass.removeChild(taskFolderCard);
            } else {
                return;
            }
        })
        

    //* ########################### Bouttons couleurs ###########################

    taskFolderBtnColor.addEventListener("click", () => {

        const colorBlue = document.createElement("button");
        const colorYellow = document.createElement("button");
        const colorOrange = document.createElement("button");
        const colorPurple = document.createElement("button");
        const colorGreen = document.createElement("button");
        const colorPink = document.createElement("button");
        const colorRed = document.createElement("button");

        colorBlue.classList.add("colorBtn", "blue")
        colorYellow.classList.add("colorBtn", "yellow")
        colorOrange.classList.add("colorBtn", "orange")
        colorPurple.classList.add("colorBtn", "purple")
        colorPink.classList.add("colorBtn", "pink")
        colorGreen.classList.add("colorBtn", "green")
        colorRed.classList.add("colorBtn", "red") 

        if (color === 0){

        
        taskFolderBtnRow.removeChild(addTaskBtn);
        taskFolderBtnRow.removeChild(taskFolderBtnSettings);
        taskFolderBtnRow.append(colorBlue, colorYellow, colorOrange, colorPurple, colorGreen, colorPink, colorRed);
        taskFolderBtnColor.before(colorBlue, colorYellow, colorOrange, colorPurple, colorGreen, colorPink, colorRed);
        
        colorBlue.addEventListener("click", () => {
                taskFolderCard.classList.add("blue");
                taskFolderCard.classList.remove("yellow", "orange", "purple", "pink", "green", "red");
                colorId = 1;
                colorLocalStorage (1)
            })
        colorYellow.addEventListener("click", () => {
                taskFolderCard.classList.add("yellow");
                taskFolderCard.classList.remove("blue", "orange", "purple", "pink", "green", "red");
                colorId = 2;
                colorLocalStorage (2)
            })
        colorOrange.addEventListener("click", () => {
                taskFolderCard.classList.add("orange");
                taskFolderCard.classList.remove("blue", "yellow", "purple", "pink", "green", "red");
                colorId = 3;
                colorLocalStorage (3)
            })
        colorPurple.addEventListener("click", () => {
                taskFolderCard.classList.add("purple");
                taskFolderCard.classList.remove("blue", "yellow", "orange", "pink", "green", "red");
                colorId = 4;
                colorLocalStorage (4)
            })
        colorPink.addEventListener("click", () => {
                taskFolderCard.classList.add("pink");
                taskFolderCard.classList.remove("blue", "yellow", "orange", "purple", "green", "red");
                colorId = 5;
                colorLocalStorage (5)
            })
        colorGreen.addEventListener("click", () => {
                taskFolderCard.classList.add("green");
                taskFolderCard.classList.remove("blue", "yellow", "orange", "purple", "pink", "red");
                colorId = 6;
                colorLocalStorage (6)
            })
        colorRed.addEventListener("click", () => {
                taskFolderCard.classList.add("red");
                taskFolderCard.classList.remove("blue", "yellow", "orange", "purple", "pink", "green");
                colorId = 7;
                colorLocalStorage (7)
            })
        color = 1;
        }else {
            taskFolderBtnRow.append(addTaskBtn, taskFolderBtnColor, taskFolderBtnSettings)
            const allBtn = document.querySelectorAll(".colorBtn");
            allBtn.forEach(btn => {
                btn.parentNode.removeChild(btn);
            });
            color = 0;
        }
    })

    //* ################ Save les couleurs dans le localStorage ################
    function colorLocalStorage (colors) {
        const lists = JSON.parse(localStorage.getItem("list")) || [];

        const idx = lists.findIndex(i => Number(i.folderId) === Number(folderId));

        if (idx !== -1) {
        lists[idx].color = colors -1;
        localStorage.setItem("list", JSON.stringify(lists));
    }
}
}

//* ################ Boutton creation de listes ################

let colorIter = 0;

addFolderBtn.addEventListener("click", () => {

    let taskContent;
    const name = prompt("Ajouter une nouvelle liste :",taskContent )

    if (name === "" || name === null){
        return;
    }

    //* ######## Affectation d'une couleurs differente a chaque liste creer ########
    const defaultColor = colorIter;
    if (colorIter >= 0 && colorIter < 6){
        colorIter ++;
    } else {
        colorIter = 0;
    }
    const folderId = Date.now();

    folderTask(name, folderId, defaultColor);

    //* ########################### Listes localStorage ###########################
    let lists = JSON.parse(localStorage.getItem("list")) || [];
    const list = {
        content: name,
        folderId: folderId,
        color: defaultColor
    }
    lists.push(list);
    localStorage.setItem("list", JSON.stringify(lists));
})

