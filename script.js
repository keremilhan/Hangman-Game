const wordDOM = document.querySelector('.word');
const wrongLettersListDOM = document.querySelector('.wrong-letters-list');
const notificationContainer = document.querySelector('.notification-container');
const figureParts = document.querySelectorAll('.figure-part');
const winLoseNotification = document.querySelector('.win-lose-notification');
const headerDOM = document.querySelector('header');
const container = document.querySelector('.container');
const bodyDOM = document.querySelector('body');
const button = document.querySelector('button');
const notificationText = document.querySelector('.notification-text')
const text = document = document.querySelector('.text');


const getDictionary = async () => {
    let url = `https://random-word-api.herokuapp.com/word`;
    let response = await fetch(url);
    let data = await response.json();
    const randomWord = data[0];

    console.log(randomWord);

    let correctLetters = [];
    let wrongLetters = [];


    function loading() {
        wordDOM.innerHTML = `${randomWord.split('').map(letter => `<p></p>`).join("")}`;
    }
    
    loading();

    function displayWord() {
        wordDOM.innerHTML = `${randomWord.split('').map(letter => `<p>${correctLetters.includes(letter) ? letter.toLocaleUpperCase("en") : ""}</p>`).join("")}`;
    
        const innerWord = wordDOM.innerText.replace(/\n/g, "");
    
        if(innerWord === randomWord.toLocaleUpperCase("en")){
            console.log("You win")
            window.removeEventListener("keydown", letterInput);
            notificationText.innerText = 'You win!'
            winLoseNotification.style.backgroundColor = "#00C851";
            winLoseNotification.style.display = 'flex';
            container.style.opacity = "0.3";
            headerDOM.style.opacity = "0.3";
        }
    }
    
    window.addEventListener("keydown", letterInput)
    
    function letterInput(e) {
        if(e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode ==222){
            console.log(e.keyCode)
            const letter = e.key
            if(randomWord.includes(letter)){
                if(correctLetters.includes(letter)){
                    text.innerText = "You have already entered this letter. Please try another letter."
                    showNotification();
                    console.log(correctLetters)
                }else{
                    correctLetters.push(letter)
                    displayWord();
                }
            }else{
                if(wrongLetters.includes(letter)){
                    text.innerText = "You have already entered this letter. Please try another letter."
                    showNotification();
                }else{
                    wrongLetters.push(letter)
                    updateWrongLetters();
                    loseCheck();
                }
            }
    
        }else{
            text.innerText = "Please enter a valid letter."
            showNotification();
        }
    
    
    }
    
    function updateWrongLetters(){
        wrongLettersListDOM.innerHTML = wrongLetters.map(letter => `<li>${letter.toLocaleUpperCase("en")}</li>`);
    
        figureParts.forEach((part, index) => {
            if(index < wrongLetters.length){
                part.style.display = 'block';
            }else{
                part.style.display = 'none';
            }    
        })
    }
    
    function showNotification() {
        console.log("show Notification");
        notificationContainer.classList.add("show");
        setTimeout(() => {
            notificationContainer.classList.remove("show");
        }, 2000);
    }
    
    function loseCheck(){
        if(wrongLetters.length == 6){
            console.log("You lose")
            window.removeEventListener("keydown", letterInput);
            winLoseNotification.style.backgroundColor = "#ff4444";
            winLoseNotification.style.display = 'flex';
            container.style.opacity = "0.3";
            headerDOM.style.opacity = "0.3";
        }
    }
    
    button.addEventListener("click", buttonClick)
    
    function buttonClick(e){
        document.location.reload(true);
    }


}

getDictionary()
