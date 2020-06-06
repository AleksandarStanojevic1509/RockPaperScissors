import { checkUser, switchUser, writeNewEvent, writeNewTurn, addScoreToUI} from "./utility.js";
const sock = io()

const inputText = document.querySelector("#text-inp");


// DOM
const switchUserHandler = document.querySelector(".fa-sync-alt");
const enterUserNameHandler = document.querySelector(".fa-paper-plane");
const userModal = document.getElementById("modal-bck");
const sendMsgHandler = document.querySelector("#btn");
const rockHandler = document.getElementById('rock')
const paperHandler = document.getElementById('paper')
const scissorsHandler = document.getElementById('scissors')

// writeNewEvent("TTTTTTTT");

checkUser(userModal);

switchUserHandler.addEventListener("click", (event) => {
    userModal.style.display = "block";
});

enterUserNameHandler.addEventListener("click", (event) => {
    event.preventDefault();
    location.reload();
    switchUser(userModal);
});


//  send msg to server

sendMsgHandler.addEventListener('click', (event) => {
    event.preventDefault();

    const text = inputText.value;
    
    sock.emit('message',`<span style="font-weight: 700;font-style: italic;color: brown;">${localStorage.prsUser}:</span> ${text} `);
    inputText.value = "";
})


// send turns to server

rockHandler.addEventListener('click', event=>{ 
    sock.emit('turn', `rock`)

} )
paperHandler.addEventListener('click', event=>{
    sock.emit('turn', `paper`)
} )
scissorsHandler.addEventListener('click', event=>{
    sock.emit('turn', `scissors`)
} )



sock.emit('username', localStorage.prsUser)

// recived from server
//chat
sock.on('message', writeNewEvent)
sock.on('game', writeNewTurn)
sock.on('score', addScoreToUI)
sock.on('username', e =>{
    // if(document.getElementById('user-tag').textContent === 'User1:'){
    //     document.getElementById('user-tag').innerHTML = e
    // }
    // else {
    //     document.getElementById('opponent-tag').innerHTML = e

    // }
    // console.log(e)
    
})