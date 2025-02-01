let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let h2 = document.querySelector('h2');
let btns = ["pink", "blue", "yellow", "green"];

document.addEventListener("keypress", function() {
    if(started == false) {
        started = true;

        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp () {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor)
    btnFlash(randomBtn);
}

function checkAns (idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = "Game over. Press any key to start a new game";
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = "white";
    }, 250);
        
    reset();
    }

}

function btnPress() {
    let btn = this;
    btnFlash(btn);

    usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    console.log(userSeq);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}