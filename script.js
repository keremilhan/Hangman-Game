const wordDOM = document.querySelector(".word");


const words = ["python", "javascript", "java", "html"];

let randomWord = words[Math.floor(Math.random() * words.length)];
console.log(randomWord);

let randomWordArray = randomWord.split("");

let correctLetters = [];
let wrongLetters = [];

function displayWord() {
    wordDOM.innerHTML = `${randomWord.split('').map(letter => `<p></p>`).join("")}`;
}

displayWord();


function change(number){
    wordDOM.innerHTML = `${randomWordArray.map(letter => `<p>${correctLetters.includes(letter) ? letter : ""}</p>`).join("")}`;
    const innerWord = wordDOM.innerText.replace(/\n/g, "");   
}


window.addEventListener("keydown",(e) => {
    const letter = e.key
    if(randomWord.includes(letter)){
        console.log(randomWordArray.indexOf(e.key))
        change(randomWordArray.indexOf(e.key))
    }else{
        alert("not included")
    }
})

