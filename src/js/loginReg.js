let users = [{
    username: "",
    email: "",
    pwd: "",
},{
    username: "Carla",
    email: "carla.deafiaa@tds.com",
    pwd: "1234",
},{
    username: "",
    email: "",
    pwd: "",
}]

const logInputUser = document.getElementById("logUsername");
const logInputPwd = document.getElementById("logPwd");
const logBtn = document.getElementById("loginBtn");

logBtn.addEventListener("click", () => {
    
    const logUser = logInputUser.value;
    const logPwd = logInputPwd.value;

    const userAccess = users.find(user => (user.username === logUser || user.email === logUser) && user.pwd === logPwd)

    if (userAccess){
        console.log("Connected");
    } else {
        console.log("Restricted");
    }

})