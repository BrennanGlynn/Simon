var buttons = Array.prototype.slice.call(document.querySelectorAll('.button'));
var greenBtn = document.querySelector('.green');
var redBtn = document.querySelector('.red');
var yellowBtn = document.querySelector('.yellow');
var blueBtn = document.querySelector('.blue');

var cheat = document.querySelector("#pattern");
var score = document.querySelector(".score-label");
var startButton = document.querySelector(".start");
var powerButton = document.querySelector(".power");

var greenSound = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
var redSound = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
var yellowSound = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
var blueSound = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
var soundTimeouts = [];


function Game() {
    this.power = false;
    this.score = -1;
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
                    endGame(this);
                    console.log("You've made an error!");
                    this.power = false;
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
        score.innerHTML = ++this.score;
        cheat.innerHTML = this.pattern;
        setTimeout(function() {playPattern(thisPattern);},1000);
    };
    this.userInsert = function (btnValue) {
        if (this.power && !soundTimeouts.length) {
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
}

function playPattern(pattern) {
    pattern.forEach(function (t, i) {
        soundTimeouts.push(setTimeout(function () {
            playSound(t);
            highlightButton(t)
        }, i*1000));
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
    }(audioFile), 1000);
}

buttons.forEach(function (element) {
    element.addEventListener('click', function () {
        //TODO: prevent user from adding to the list while the demo pattern is being played
        var value = parseInt(this.getAttribute('value'));
        g.userInsert(value);
    })
})

powerButton.addEventListener('click', function () {
    if (g.power) {
        score.innerHTML = "";
        g.flipPower();
        endGame(g);
        //TODO: stop all sounds that are still queued to play
    } else {
        g.flipPower()
        score.innerHTML = 0;
    }
});

startButton.addEventListener('click', function () {
    if (g.power) {
        gameInterval = setInterval(function () {
            g.playGame();
        }, 500)
    }
})



//////////////////////////////////////////////

// var g = new Game();
// g.powerOn();
//
// function x() {
//     g.playGame();
// }
//
// setInterval(x, 100);
