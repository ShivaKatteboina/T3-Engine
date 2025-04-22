let doc = document.querySelectorAll(".box");
let res = document.querySelector(".reset");
let msg = document.querySelector(".msg-winner");
let new_game = document.querySelector(".new");
let TurnX = true;

const winpatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

const resetgame = () => {
    TurnX = true;
    for (let box of doc) {
        box.disabled = false;
        box.innerHTML = "";
        box.classList.remove("win");
    }
    msg.classList.add("hide");
    new_game.classList.add("hide");
};

const disablebtns = () => {
    for (let box of doc) {
        box.disabled = true;
    }
};

const showwinner = (winner) => {
    msg.classList.remove("hide");
    msg.innerHTML = `Winner is ${winner}`;
    new_game.classList.remove("hide");
    disablebtns();
};

const checkDraw = () => {
    let allFilled = true;
    doc.forEach((box) => {
        if (box.innerHTML === "") {
            allFilled = false;
        }
    });
    return allFilled;
};

const checkwinner = () => {
    for (let pattern of winpatterns) {
        let [a, b, c] = pattern;
        let posval1 = doc[a].innerHTML;
        let posval2 = doc[b].innerHTML;
        let posval3 = doc[c].innerHTML;

        if (posval1 !== "" && posval1 === posval2 && posval1 === posval3) {
            doc[a].classList.add("win");
            doc[b].classList.add("win");
            doc[c].classList.add("win");
            showwinner(posval1);
            return;
        }
    }

    // If no winner, check for draw
    if (checkDraw()) {
        msg.classList.remove("hide");
        msg.innerHTML = `It's a Draw!`;
        new_game.classList.remove("hide");
        disablebtns();
    }
};

doc.forEach((box) => {
    box.addEventListener("click", () => {
        if (TurnX) {
            box.innerHTML = "X";
            TurnX = false;
        } else {
            box.innerHTML = "O";
            TurnX = true;
        }
        box.disabled = true;
        checkwinner();
    });
});

new_game.addEventListener("click", resetgame);
res.addEventListener("click", resetgame);
