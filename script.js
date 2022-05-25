const wordDOM = document.querySelector(".word");
const wrongLettersListDOM = document.querySelector(".wrong-letters-list");
const notificationContainer = document.querySelector('.notification-container');


const words = ["python", "javascript", "java", "html"];

let randomWord = words[Math.floor(Math.random() * words.length)];
console.log(randomWord);

let randomWordArray = randomWord.split("");

let correctLetters = [];
let wrongLetters = [];

function loading() {
    wordDOM.innerHTML = `${randomWord.split('').map(letter => `<p></p>`).join("")}`;
}

loading();

function displayWord() {
    wordDOM.innerHTML = `${randomWordArray.map(letter => `<p>${correctLetters.includes(letter) ? letter.toLocaleUpperCase("en") : ""}</p>`).join("")}`;
}


window.addEventListener("keydown",(e) => {
    const letter = e.key
    if(randomWord.includes(letter)){
        if(correctLetters.includes(letter)){
            showNotification();
            console.log(correctLetters)
        }else{
            correctLetters.push(letter)
            displayWord();
        }
    }else{
        if(wrongLetters.includes(letter)){
            showNotification();
        }else{
            wrongLetters.push(letter)
            console.log("wrong",wrongLetters)
            updateWrongLetters();
        }
    }
})

function updateWrongLetters(){
    wrongLettersListDOM.innerHTML = wrongLetters.map(letter => `<li>${letter.toLocaleUpperCase("en")}</li>`)
}

function showNotification() {
    console.log("show Notification");
    notificationContainer.classList.add("show");
    setTimeout(() => {
        notificationContainer.classList.remove("show");
    }, 2000);
}
