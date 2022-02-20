// preloader
window.addEventListener('load', () => {
    document.querySelector('.pre-loader').classList.add('loaded');
});
// end of preloader

// using typed js for title
const typed = new Typed('.title', {
    strings: ['Test your typing skill'],
    loop: true,
    loopCount: Infinity,
    typeSpeed: 70,
    showCursor: false,
    smartBackspace: true,
    backSpeed: 50,
    backDelay: 700,
});

// changing color to title text
const colorsForTitle = ['#e0c45c', '#21e6c1', '#83e85a', '#f3558e'];

let countToChangeColor = 1;
setInterval(() => {
    document.querySelector('.title').style.color =
        colorsForTitle[countToChangeColor];
    if (countToChangeColor === 2) {
        countToChangeColor = 0;
        return;
    }
    countToChangeColor++;
}, 2200);

// end of changing color to title text

// counting number
const countNumber = document.querySelector('.count-number');
const counterLayer = document.querySelector('.counter-layer');
const playground = document.querySelector('.playground');
let countNumberValue = 3;

const countingNumber = () => {
    countNumber.textContent = countNumberValue;
    addingClassToCountNumber();
    let startCounting = setInterval(() => {
        if (countNumberValue === 1) {
            clearInterval(startCounting);
            countNumber.textContent = 'Go!';
            addingClassToCountNumber();
            countNumberValue = 3;
            setTimeout(() => {
                counterLayer.style.display = 'none';
                playground.style.display = 'block';
                typingInput.focus();
                // startTime = setInterval(() => timer(totalScore), 1000);
            }, 300);

            return;
        }
        countNumberValue--;
        countNumber.textContent = countNumberValue;
        addingClassToCountNumber();
    }, 1000);
};

// adding class to countNumber
const addingClassToCountNumber = () => {
    countNumber.classList.add('count');
    setTimeout(() => {
        countNumber.classList.remove('count');
    }, 300);
};
// end of counting number

//let's go
const homePage = document.querySelector('.home');
const start = document.querySelector('.start');
start.addEventListener('click', () => {
    homePage.style.display = 'none';
    counterLayer.style.display = 'flex';
    setTimeout(countingNumber, 300);
});

// playground UI
//pause button click
const pauseBtn = document.querySelector('.pause');
const overlayLayer = document.querySelector('.overlay-layer');
pauseBtn.addEventListener('click', () => {
    overlayLayer.classList.add('open');
});

//quit button click
const quitBtn = document.querySelector('.quit');
quitBtn.addEventListener('click', () => {
    overlayLayer.classList.remove('open');
    playground.style.display = 'none';
    homePage.style.display = 'block';
});

// playground UI
const words = [
    'Javascript',
    'Congratulations',
    'Responsibility',
    'Environment',
    'Emotional',
    'Transportation',
    'International',
    'Strawberry',
    'Chocolate',
    'Programming',
];

let givenWord = document.querySelector('.given-word');
const typingInput = document.querySelector('.typing-input');
const scoreNumber = document.querySelectorAll('.score-num');

//updateTotalScore
const updateTotalScore = (totalScore) => {
    scoreNumber.forEach((scoreNum) => (scoreNum.textContent = totalScore));
};

//changeWord
const changeWord = () => {
    //generate random number
    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 10);
    };
    givenWord.innerHTML = '';
    words[generateRandomNumber()].split('').forEach((word) => {
        givenWord.innerHTML += `<span>${word}</span>`;
    });
};
changeWord();

let userTypedArr = [];
let startTime;
let totalScore = 0;
//word matching
function wordMatching() {
    userTypedArr = [...this.value];
    const givenWordArr = [...givenWord.querySelectorAll('span')];
    const givenWordText = givenWordArr
        .map((w) => w.innerText)
        .reduce((a, b) => a + b);

    if (this.value.length === 0) return;
    if (this.value.length > givenWordArr.length) return;
    if (
        this.value.length === givenWordArr.length &&
        this.value === givenWordText
    ) {
        this.value = '';
        if (userTypedArr.length === 0) return;
        totalScore++;
        updateTotalScore(totalScore);
        changeWord();
        typingInput.focus();
        showCorrectGif();
        clearInterval(startTime);
        time = 7;
        startTime = setInterval(() => timer(totalScore, time), 1000);
    }

    if (
        userTypedArr[userTypedArr.length - 1] ===
        givenWordArr[userTypedArr.length - 1].innerText
    ) {
        // if (window.innerWidth < 1100) {
        //     return;
        // }
        givenWordArr[userTypedArr.length - 1].classList.add('correct-color');
    }
}

typingInput.addEventListener('keyup', wordMatching);
typingInput.addEventListener('keydown', wordMatching);
typingInput.addEventListener('keydown', (e) => {
    backspace(e);
});

// for backspace
const backspace = (e) => {
    if (e.target.value.length === 0) return;
    const givenWordArr = [...givenWord.querySelectorAll('span')];

    // if (window.innerWidth < 1100) {
    //     return;
    // }

    if (e.keyCode === 8 || e.key === 'Backspace') {
        if (e.target.value.length > givenWordArr.length) {
            return;
        } else {
            givenWordArr[userTypedArr.length - 1].classList.remove(
                'correct-color'
            );
        }
    }
};

//show correct gif
const showCorrectGif = () => {
    const correctGif = document.querySelector('.correct-gif');
    correctGif.classList.add('show');
    setTimeout(() => {
        correctGif.classList.remove('show');
    }, 1000);
};

const timeLeftNumber = document.querySelector('.time-left-num');
const gameOverLayer = document.querySelector('.game-over-layer');
const gameOverFeedback = document.querySelector('.game-over-feedback');
const gameOverGif = document.querySelector('.game-over-gif');

//getting value form level select input
const level = document.getElementById('level');
let time = 7;
// level.addEventListener('change', (e) => {
//     const difficulty = e.target.value;
//     if (difficulty === 'easy') {
//         time = 7;
//         console.log(7);
//     } else if (difficulty === 'medium') {
//         time = 5;
//         console.log(5);
//     } else {
//         time = 3;
//         console.log(3);
//     }
// });

// calculation time
function timer(totalScore) {
    time -= 1;
    console.log(time);
    const timeLeft = time < 10 ? '0' + time.toString() : time;
    timeLeftNumber.textContent = timeLeft;
    if (time === 0) {
        typingInput.disabled = true;
        if (totalScore < 10) {
            gameOverFeedback.innerHTML = `OOps! You don't even get <span class="min-score">10</span> scores`;
            gameOverGif.src = './assets/Q74YlL.gif';
        } else {
            gameOverFeedback.innerHTML = `Wowwww! You got over <span class="min-score">10</span> scores`;
            gameOverGif.src = './assets/wow-rap-battle.gif';
        }
        gameOverLayer.style.display = 'flex';
        clearInterval(startTime);
    }
}
