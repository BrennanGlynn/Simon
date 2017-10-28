function Game() {
    this.power = false;
    this.score = -1;
    this.pattern = [];
    this.userPattern = [];
    this.powerOn = function () {
        this.power = true;
    };
    this.playGame = function () {
        if (this.power) {
            switch (this.getStatus()) {
                case -1:
                    //end the game
                    //endGame()
                    console.log("end the game dickface");
                    this.power = false;
                    break;
                case 0:
                    //let the player continue
                    break;
                case 1:
                    //proceed with the game
                    console.log("please proceed!");
                    console.log(g);
                    this.score++;
                    this.pattern.push(Math.floor(Math.random() * 4));
                    this.userPattern = [];
                    break;
            }
        }
    };
    this.userInsert = function (btnValue) {
      this.userPattern.push(btnValue)
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
g.powerOn();

function x() {
    g.playGame();
}

setInterval(x, 100);


var buttons = Array.prototype.slice.call(document.querySelectorAll('.button'));

buttons.forEach(function (element) {
    element.addEventListener('click', function () {
        var value = parseInt(this.getAttribute('value'));
        g.userInsert(value);
        console.log("User inserted " + value);
    })
})
