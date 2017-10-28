var buttons = Array.prototype.slice.call(document.querySelectorAll('.button'));

var cheat = document.querySelector("#pattern");
var yours = document.querySelector("#yourPattern");

var greenSound = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
var redSound = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
var yellowSound = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
var blueSound = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';


function Game() {
    this.power = false;
    this.score = -1;
    this.pattern = [];
    this.userPattern = [];
    this.powerOn = function () {
        this.power = true;
    };
    this.playGame = function () {
        var pattern = this.pattern;
        if (this.power) {
            switch (this.getStatus()) {
                case -1:
                    //end the game
                    //endGame()
                    console.log("You've made an error!");
                    this.power = false;
                    break;
                case 0:
                    //let the player continue
                    break;
                case 1:
                    //proceed with the game
                    console.log("please proceed!");
                    console.log(g);
                    this.userPattern = [];
                    this.score++;
                    this.pattern.push(Math.floor(Math.random() * 4));
                    setTimeout(function() {playPattern(pattern);},1000);
                    cheat.innerHTML = this.pattern;
                    yours.innerHTML = this.userPattern;
                    break;
            }
        }
    };
    this.userInsert = function (btnValue) {
        if (this.power) {
            this.userPattern.push(btnValue);
            playSound(btnValue);
            yours.innerHTML = this.userPattern;
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

buttons.forEach(function (element) {
    element.addEventListener('click', function () {
        var value = parseInt(this.getAttribute('value'));
        g.userInsert(value);
        console.log("User inserted " + value);
    })
})

function playPattern(pattern) {
    pattern.forEach(function (t, i) {
        setTimeout(function () {
            playSound(t);
        }, i*1000)
    })
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
        }
    }(audioFile), 1000)
}



//////////////////////////////////////////////

var g = new Game();
g.powerOn();

function x() {
    g.playGame();
}

setInterval(x, 100);
