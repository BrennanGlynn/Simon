var buttons = Array.prototype.slice.call(document.querySelectorAll('.button'));
var greenBtn = document.querySelector('.green');
var redBtn = document.querySelector('.red');
var yellowBtn = document.querySelector('.yellow');
var blueBtn = document.querySelector('.blue');

var cheat = document.querySelector("#pattern");
var lives = document.querySelector(".lives");
var score = document.querySelector(".score-label");
var startButton = document.querySelector(".start");
var powerButton = document.querySelector(".power");

var greenSound = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
var redSound = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
var yellowSound = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
var blueSound = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
var soundTimeouts = [];

const DEMO_DELAY = 500;


function Game() {
    //TODO: Strict mode
    this.strict = false;
    this.power = false;
    this.score = 0;
    this.lives = 2;
    this.pattern = [];
    this.userPattern = [];
    this.flipPower = function () {
        this.power = !this.power;
    };
    this.playGame = function () {
        if (this.power) {
            switch (this.getStatus()) {
                case -1:
                    //end the game
                    if (this.strict || !this.lives) {
                        endGame();
                    } else {
                        this.lives--;
                        this.userPattern = [];
                        score.innerHTML = "OOPS!";
                        setTimeout(function(x) {
                            return function() {
                                playPattern(x);
                                updateDisplay();
                            }}(this.pattern), DEMO_DELAY);
                    }
                    break;
                case 0:
                    //let the player continue
                    break;
                case 1:
                    //proceed with the game
                    this.updateGame();
                    break;
            }
        }
    };
    this.updateGame = function () {
        var thisPattern = this.pattern;
        this.userPattern = [];
        this.pattern.push(Math.floor(Math.random() * 4));
        this.score++;
        updateDisplay();
        setTimeout(function() {playPattern(thisPattern);}, DEMO_DELAY);
    };
    this.userInsert = function (btnValue) {
        if (this.power && noTimeouts()) {
            this.userPattern.push(btnValue);
            playSound(btnValue);
            highlightButton(btnValue);
        }
    };
    this.getStatus = function () {
        var pattern = this.pattern;
        var userPattern = this.userPattern;
        var error = false;

        if (userPattern.length > pattern.length) {
            error = true;
        }

        userPattern.forEach(function (val, i) {
            if (val !== pattern[i]) {
                error = true;
            }
        });

        if (error) {
            return -1;
        } else if (userPattern.length < pattern.length) {
            return 0;
        } else {
            return 1;
        }
    };
}

var g = new Game();
var gameInterval;

function endGame() {
    g.power = false;
    g.pattern = [];
    g.userPattern = [];
    g.score = 0;
    score.innerHTML = "";
    //TODO show proper game ending ui
    clearInterval(gameInterval);
    soundTimeouts.forEach(function (t) {
        clearTimeout(t);
    })
    soundTimeouts = [];
}

function playPattern(pattern) {
    pattern.forEach(function (t, i) {
        soundTimeouts.push(setTimeout(function () {
            playSound(t);
            highlightButton(t)
        }, i*DEMO_DELAY));
    })
}

function highlightButton(btnVal) {
    switch (btnVal) {
        case 0:
            greenBtn.classList.add('highlight');
            setTimeout(function () {
                greenBtn.classList.remove('highlight');
            }, 250);
            break;
        case 1:
            redBtn.classList.add('highlight');
            setTimeout(function () {
                redBtn.classList.remove('highlight');
            }, 250);
            break;
        case 2:
            yellowBtn.classList.add('highlight');
            setTimeout(function () {
                yellowBtn.classList.remove('highlight');
            }, 250);
            break;
        case 3:
            blueBtn.classList.add('highlight');
            setTimeout(function () {
                blueBtn.classList.remove('highlight');
            }, 250);
            break;
    }
}

function playSound(btnVal) {
    var audioFile;

    switch (btnVal) {
        case 0:
            audioFile = new Audio(greenSound);
            break;
        case 1:
            audioFile = new Audio(redSound);
            break;
        case 2:
            audioFile = new Audio(yellowSound);
            break;
        case 3:
            audioFile = new Audio(blueSound);
            break;
    }

    audioFile.play();
    setTimeout(function (x) {
        return function () {
            x.pause();
            soundTimeouts.splice(0, 1);
        }
    }(audioFile), DEMO_DELAY);
}

function noTimeouts() {
    return !soundTimeouts.length;
}

buttons.forEach(function (element) {
    element.addEventListener('click', function () {
        var value = parseInt(this.getAttribute('value'));
        g.userInsert(value);
    })
})

powerButton.addEventListener('click', function () {
    if (g.power) {
        score.innerHTML = "";
        lives.innerHTML = "";
        endGame();
    } else {
        g.flipPower()
        updateDisplay()
    }
});

startButton.addEventListener('click', function () {
    if (g.power) {
        g.lives = 2;
        gameInterval = setInterval(function () {
            g.playGame();
        }, DEMO_DELAY)
    }
})

function updateDisplay() {
    updateLivesDisplay();
    cheat.innerHTML = g.pattern;
    score.innerHTML = "LEVEL: " + g.score;
    // update lives on the display
}

function updateLivesDisplay() {
    let numLives = g.lives;
    let lifeElements = [];

    while (numLives >= 0) {
        let lifeElement = document.createElement('div');
        lifeElement.classList.add('life');
        lifeElements.push(lifeElement);
        numLives--;
    }

    lives.innerHTML = "";

    lifeElements.forEach(function (t) {
        lives.appendChild(t)
    });
}
