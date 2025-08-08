
console.log("init");
const addFolderBtn = document.getElementById("addFolderTask");


function TaskCard(parent, taskText) {
// Task card content 
const card = document.createElement("div");
const cardBody = document.createElement("div");
const cardPp = document.createElement("div");
const cardPpImg = document.createElement("img");
const cardContent = document.createElement("h3");
const btnSection = document.createElement("div");
const doBtn = document.createElement("button");
const removeBtn = document.createElement("button");
const confirmRemoveYes = document.createElement("button");
const confirmRemoveNo = document.createElement("button");

parent.appendChild(card);
card.appendChild(cardBody);
cardBody.append(cardPp,cardContent, btnSection);
cardPp.appendChild(cardPpImg);
btnSection.append(removeBtn, doBtn);

card.classList.add("cardTask");
cardBody.classList.add("cardBody");
cardPp.classList.add("cardProfPic");
btnSection.classList.add("btnSectionCard");
cardContent.textContent = taskText;
localStorage.setItem("Feur", cardContent.toString());

doBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>`;
removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1b1b1b89"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;


cardPpImg.src = "https://i.pinimg.com/736x/b7/51/99/b75199056b5dd384275a7728f0fc289c.jpg";

confirmRemoveNo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a83131ff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
confirmRemoveYes.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3e9d38ff"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;


cardContent.addEventListener("dblclick", () => {
    const currentText = cardContent.textContent;

    const editCardTitle = document.createElement("input");
    editCardTitle.classList.add("editTitle");
    editCardTitle.type = "text";
    editCardTitle.value = currentText;

    cardContent.replaceWith(editCardTitle);
    editCardTitle.focus();

    editCardTitle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && editCardTitle.value !== ""){
            const newTitle = editCardTitle.value;
            cardContent.textContent = newTitle;
            editCardTitle.replaceWith(cardContent);
            return
        }else if (e.key === "Enter" && editCardTitle.value === ""){
            parent.removeChild(card);
            return
        }
    })
    
})


let state = 0;

doBtn.addEventListener("click", () => {

    switch (state){
        case 1:
            doBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>`;
        state = 0;
        break;
        case 0:
            doBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`;
        state = 1;
        break
        }
})

removeBtn.addEventListener("click", () => {
    btnSection.removeChild(removeBtn);
    btnSection.removeChild(doBtn);
    btnSection.append(confirmRemoveNo, confirmRemoveYes);})

    confirmRemoveNo.addEventListener("click", () => {
btnSection.removeChild(confirmRemoveNo);
    btnSection.removeChild(confirmRemoveYes);
    btnSection.append(removeBtn, doBtn)
})

confirmRemoveYes.addEventListener("click", () => {
    parent.removeChild(card);
    
})
}




    


addFolderBtn.addEventListener("click", () => {

    let taskContent;
    const name = prompt("Ajouter une nouvelle liste :",taskContent )

    if (name === "" || name === null){
        return;
    }


    folderTask(name)
})




function folderTask(name, folderId = null, savedTasks = []) {
    const id = folderId || Date.now();
    const taskFolderCard = document.createElement("div");
    const taskFolderRow = document.createElement("div");
    const taskFolderTitle = document.createElement("h3");
    const taskFolderBtnRow = document.createElement("div");
    const addTaskBtn = document.createElement("button");
    const taskFolderBtnColor = document.createElement("button");
    const taskFolderBtnSettings = document.createElement("button");
    const inTaskFolder = document.createElement("div");
    

    taskFolderCard.classList.add("taskFolder");
    taskFolderRow.classList.add("taskFolderRow");
    taskFolderBtnRow.classList.add("buttonRow");
    inTaskFolder.classList.add("inTaskFolder");

    document.querySelector(".contentTasks").appendChild(taskFolderCard);
    taskFolderCard.append(taskFolderRow,inTaskFolder);
    taskFolderRow.append(taskFolderTitle, taskFolderBtnRow);
    taskFolderBtnRow.append(addTaskBtn, taskFolderBtnColor, taskFolderBtnSettings);


    taskFolderTitle.textContent = name;
    addTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>`
    taskFolderBtnColor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>`;
              taskFolderBtnSettings.innerHTML = `<svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="#e3e3e3"
              >
                <path
                  d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
                />
              </svg>`;

    let color = 0;

    //* Bouttons ajouter une tache

    addTaskBtn.addEventListener("click", () => {
        let taskContent;
    const newTask = prompt("Ajouter une nouvelle tache :",taskContent );

    if (newTask === "" || newTask === null){
        return;
    }

    TaskCard(inTaskFolder, newTask);
    })

    //* Edit title

    taskFolderTitle.addEventListener("dblclick", () => {
        const currentTitle = taskFolderTitle.textContent;

        const editFolderTitle = document.createElement("input")
        editFolderTitle.classList.add("editTitle");
        editFolderTitle.type = "text";
        editFolderTitle.value = currentTitle;

        taskFolderTitle.replaceWith(editFolderTitle);
        editFolderTitle.focus();

        editFolderTitle.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && editFolderTitle.value !== ""){
                const newFolderTitle = editFolderTitle.value;
                taskFolderTitle.textContent = newFolderTitle;
                editFolderTitle.replaceWith(taskFolderTitle);
                return;
            }
            else if (e.key === "Enter" && editFolderTitle.value === ""){
                document.querySelector(".contentTasks").removeChild(taskFolderCard);
                return;
            }
        })
    })

    //* Bouttons couleurs

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
        })
        colorYellow.addEventListener("click", () => {
                taskFolderCard.classList.add("yellow");
                taskFolderCard.classList.remove("blue", "orange", "purple", "pink", "green", "red");
        })
        colorOrange.addEventListener("click", () => {
                taskFolderCard.classList.add("orange");
                taskFolderCard.classList.remove("blue", "yellow", "purple", "pink", "green", "red");
        })
        colorPurple.addEventListener("click", () => {
                taskFolderCard.classList.add("purple");
                taskFolderCard.classList.remove("blue", "yellow", "orange", "pink", "green", "red");
        })
        colorPink.addEventListener("click", () => {
                taskFolderCard.classList.add("pink");
                taskFolderCard.classList.remove("blue", "yellow", "orange", "purple", "green", "red");
        })
        colorGreen.addEventListener("click", () => {
                taskFolderCard.classList.add("green");
                taskFolderCard.classList.remove("blue", "yellow", "orange", "purple", "pink", "red");
        })
        colorRed.addEventListener("click", () => {
                taskFolderCard.classList.add("red");
                taskFolderCard.classList.remove("blue", "yellow", "orange", "purple", "pink", "green");
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


}
folderTask("To-Do");


// let cardDiv = document.querySelector(".cardTask");
// cardDiv.addEventListener("dragstart", function (e) {
//     let selected = e.target;


// })