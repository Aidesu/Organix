
export const ADD_FOLDER_BTN = document.createElement("button");
mainPage();
mainPageBar();

//*######################### HEADER ####################################
function mainPage() {
    try {
        const header = document.createElement("header");
        const navSection = document.createElement("section");
        const navBar = document.createElement("nav");
        const navATitle = document.createElement("a");
        const navUl = document.createElement("ul");
        const navBtn1 = document.createElement("li");
        const navBtn2 = document.createElement("li");
        const SIGNIN_BTN = document.createElement("a");
        const ADD_BTN = ADD_FOLDER_BTN;

        document.body.appendChild(header);
        header.appendChild(navSection);
        navSection.appendChild(navBar);
        navBar.append(navATitle, navUl);
        navUl.append(navBtn1, navBtn2);
        navBtn1.appendChild(ADD_BTN);
        navBtn2.appendChild(SIGNIN_BTN);
        navSection.classList.add("nav");

        SIGNIN_BTN.href = "signin.html";
        navATitle.href = "index.html";
        navBar.id = "nav";
        navATitle.id = "title";
        ADD_BTN.id = "addFolderTask"
        ADD_BTN.textContent = "+ Add list";
        SIGNIN_BTN.textContent = "Sign in";
        navATitle.textContent = "Organix";
    return;
    }catch (e) {
        return e;
    }
}



//*######################### NAVBAR ####################################
function mainPageBar() {
    try {
        const barSection = document.createElement("section");
        const header = document.createElement("header");
        const barNav = document.createElement("nav");
        const barUl = document.createElement("ul");
        const barLi1 = document.createElement("li");
        const barLi2 = document.createElement("li");
        const barLi3 = document.createElement("li");
        const barALi1 = document.createElement("a");
        const barALi2 = document.createElement("a");
        const barALi3 = document.createElement("a");

        document.body.appendChild(header);
        header.appendChild(barSection);
        barSection.appendChild(barNav);
        barNav.appendChild(barUl);
        barUl.append(barLi1, barLi2, barLi3);
        barLi1.appendChild(barALi1);
        barLi2.appendChild(barALi2);
        barLi3.appendChild(barALi3);

        barSection.classList.add("nav");
        barNav.id = "bar";

        barALi1.href = "tasks.html";
        barALi2.href = "notes.html";
        barALi3.href = "calendar.html";

        barALi1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -950 960 960"><path d="M655-200 513-342l56-56 85 85 170-170 56 57-225 226Zm0-320L513-662l56-56 85 85 170-170 56 57-225 226ZM80-280v-80h360v80H80Zm0-320v-80h360v80H80Z"/></svg>`
        barALi2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`
        barALi3.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>`
        return;
    } catch (e) {
        return e;
    }
}


























