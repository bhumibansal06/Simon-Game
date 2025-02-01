let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0; // Store high score
let h2 = document.querySelector('h2');
let btns = ["pink", "blue", "yellow", "green"];

// Event listener to start the game
document.addEventListener("keypress", function () {
    if (started === false) {
        started = true;
        levelUp();
    }
});

// Button flash effect
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Level Up logic - add a new button to sequence, flash it
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level} | High Score: ${highScore}`;

    let randomIdx = Math.floor(Math.random() * 4); // Use 4 colors, not 3
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`#${randomColor}`);
    gameSeq.push(randomColor);

    // Flash button
    btnFlash(randomBtn);
}

// Check user's answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // Proceed to next level after 1 sec
        }
    } else {
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }

        h2.innerText = `Game Over! Score: ${level}, High Score: ${highScore}. Press any key or click Start to retry.`;
        document.body.classList.add("game-over"); // Shake effect
        setTimeout(() => document.body.classList.remove("game-over"), 500); // Remove shake after animation

        reset();
    }
}

// Handle button press by user
function btnPress() {
    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Attach click event to buttons
let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset game data
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
