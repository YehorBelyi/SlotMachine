let attempts = 0;
const MAX_ATTEMPS = 3;

let attValue = document.querySelector("#attempts");
attValue.innerHTML = `${attempts} спроб з ${MAX_ATTEMPS}`;

const username = () => {
    while (true) {
        const playerName = prompt("Як до вас звертатись?");

        if (playerName === null) {
            alert("Ви не ввели своє ім'я! Спробуйте ще раз.");
            continue;
        }

        const newName = playerName.trim();

        if (newName === "") {
            alert("Поле не повинне бути пусте!");
        } else if (newName.length > 15) {
            alert("Ваше ім'я не може перевищувати 15 символів!");
        } else if (newName.length < 3) {
            alert("Ваше ім'я не може бути менше ніж 3 символи!");
        } else {
            return newName;
        }
    }
};

const playerName = username();
const playerNameVariable = document.querySelector("#username");
playerNameVariable.innerHTML = playerName;

const fruits = ["cherries", "grapes", "watermelon", "lemon"];
const cardImages = document.querySelectorAll(".card img");
const controls = document.querySelector('.slot-controls');
const playButton = document.querySelector(".control-button input");

const winnerState = document.querySelector('#winner-state');
const winImg = document.querySelector('.win-screen img');

cardImages.forEach((card) => {
    card.style.display = 'none';
});

const checkForWin = () => {
    const images = Array.from(cardImages);
    const fruitNames = images.map((image) => image.src.split('/').pop().split('.')[0]);
    return fruitNames.every(fruit => fruit === fruitNames[0]);
};

const setRandomImage = () => {
    cardImages.forEach((image) => {
        const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
        image.style.display = 'block';
        image.setAttribute('src', `./images/slot-icons/${randomFruit}.png`);
    });
};

const displayResult = (isWin) => {
    if (isWin) {
        winnerState.style.color = "yellow";
        winnerState.innerHTML = 'Ви перемогли!';
        winImg.setAttribute('src', './images/win-emojis/win.webp');
    } else {
        winnerState.style.color = "red";
        winnerState.innerHTML = 'Ви програли!';
        winImg.setAttribute('src', './images/win-emojis/lose.webp');
    }
    document.querySelector('.win-screen').style.display = 'flex';
};

document.querySelector(".win-screen").addEventListener('click', () => {
    document.querySelector(".win-screen").style.display = "none";
    attempts = 0;
    attValue.innerHTML = `${attempts} спроб з ${MAX_ATTEMPS}`;
});

playButton.addEventListener('click', () => {
    if (attempts >= MAX_ATTEMPS) {
        displayResult(false);
        return;
    }

    controls.classList.remove('spin-animation');
    setTimeout(() => {
        controls.classList.add('spin-animation');
    }, 10);

    setTimeout(() => {
        const getRandomImage = setInterval(setRandomImage, 100);

        playButton.setAttribute('disabled', 'true');

        setTimeout(() => {
            clearInterval(getRandomImage);
            playButton.removeAttribute('disabled');

            setTimeout(() => {
                const win = checkForWin();

                setTimeout(() => {
                    if (win) {
                        displayResult(true);
                        attempts = 0;
                    } else {
                        attempts++;
                    }

                    attValue.innerHTML = `${attempts} спроб з ${MAX_ATTEMPS}`;

                    if (attempts >= MAX_ATTEMPS && !win) {
                        displayResult(false);
                    }
                }, 1000);

            }, 200);

        }, 2000);

    }, 250);
});
