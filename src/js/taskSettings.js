console.log("init from taskSettings")

export function settingsUwU () {
const btnSettings = document.querySelector("#btnSettings");
const settingsPopUp = document.createElement("div");
const wallpaperImg = document.createElement("input");
const wallpaperColor = document.createElement("input");
const wallpaperDoneBtn = document.createElement("button");

settingsPopUp.id = "settingsPopUp";
wallpaperColor.type = "color";
wallpaperDoneBtn.textContent = "Done";

btnSettings.addEventListener("click", () => {
    settings()
})

function settings () {
    document.body.appendChild(settingsPopUp);
    settingsPopUp.append(wallpaperImg, wallpaperColor, wallpaperDoneBtn);
    wallpaperDoneBtn.addEventListener("click", () => {
        document.body.style.backgroundImage = `url("${wallpaperImg.value}")`
        document.body.removeChild(settingsPopUp);
    })
}


}