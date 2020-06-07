// DOM
const inputText = document.querySelector("#text-inp");

//*************/  USER
//  checkUser

export const checkUser = (userModal) => {
    if (localStorage.prsUser === undefined) {
        alert("Please enter username...");
        userModal.style.display = "block";
        document.querySelector("#user span").innerHTML = localStorage.prsUser;
    } else if (localStorage.prsUser !== undefined) {
        document.querySelector("#user span").innerHTML = localStorage.prsUser;
        userModal.style.display = "none";
    }
};

// switchUser
export const switchUser = (userModal) => {
    const username = document.querySelector("#username");
    if (username.value === "") {
        alert("Please enter username...");
    } else {
        localStorage.setItem("prsUser", `${username.value}`);
        username.value = "";
        userModal.style.display = "none";
    }
};

// **************/ Render msg from server

export const writeNewEvent = (text) => {    
    const parentEl = document.querySelector("#display-chat ul");
    const childEl = document.createElement("li");
    childEl.innerHTML = text;
    parentEl.appendChild(childEl);
    document.getElementById('display-chat').scrollTop = document.getElementById('display-chat').scrollHeight
};


// **************/ Render turns  from server

export const writeNewTurn = (turn) => {    
    const parentEl = document.querySelector("#display-game ul");
    const childEl = document.createElement("li");
    childEl.innerHTML = turn;
    parentEl.appendChild(childEl);
    document.getElementById('display-game').scrollTop = document.getElementById('display-game').scrollHeight

};

// **************/ UpdateUIScore
export const addScoreToUI = scoreArray =>{
    
    document.getElementById('user-sc').innerHTML = scoreArray[0];
    document.getElementById('opponent-sc').innerHTML = scoreArray[1];

}