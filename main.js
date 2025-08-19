//variables 
const btnsContainer = document.getElementById("gameArea");
const btns = document.querySelectorAll("#gameArea button")
const rollBtn = document.querySelector(".roll")
const newGameBtn = document.querySelector(".new-game")

//sounds 
const check = new Audio("./sounds/shortSuccess.mpga")
const win = new Audio("./sounds/win.mpga")
const lose = new Audio("./sounds/lose.mpga")


roll()

//return array with 10 random numbers
function getRandomNums() {
    let arr = new Array(10);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.ceil(Math.random() * 6)
    }
    return arr
}

//add random numbers to btns
function roll() {
    let array = getRandomNums()
    for (let i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains("checked")){
            continue;
        } else {
            btns[i].textContent = array[i]
        }
    }
}

function newGame(){
    btns.forEach(btn => {
        btn.classList.remove("checked")
    })
    roll()
}

// check if all numbers are the same
function checkAllSame() {
    const firstText = btns[0].textContent.trim();
    return [...btns].every(btn => btn.textContent.trim() === firstText);
}
// check game state
function checkGame() {
    const allChecked = [...btns].every(btn => btn.classList.contains("checked"));
    if (allChecked) {
        if (checkAllSame()) {
            // game Won 
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
            btns.forEach(btn => btn.disabled = true)
            win.play()
            rollBtn.style.display = "none";
            newGameBtn.style.display = "block";
        } else {
            // game Lost 
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { x: 0.5, y: 0 },
                colors: ['#ff0000', '#000000'], // أحمر وأسود
            });
            btns.forEach(btn => btn.disabled = true)
            lose.play()
            rollBtn.style.display = "none";
            newGameBtn.style.display = "block";
        }
    }
}
// btn click
btns.forEach(btn => btn.addEventListener("click", (e) => {
    e.target.classList.toggle("checked");
    check.play()
    checkGame();
}));
//toggle the numbers 
rollBtn.addEventListener("click", ()=> {
    roll()
})
//start new game
newGameBtn.addEventListener("click", ()=> {
    btns.forEach(btn => btn.disabled = false)
    newGame()
    rollBtn.style.display = "block";
    newGameBtn.style.display = "none";
})





