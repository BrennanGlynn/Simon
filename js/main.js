function Game() {
    this.power = false;
    this.score = 0;
    this.pattern = [];
    this.userPattern = [];
    this.nextPattern = function () {
        //add another button press to the pattern
    };
    this.getStatus = function () {
        var inputLength = this.userPattern.length;
        var patLength = this.pattern.length;

        if (inputLength > patLength) return 2;
        for (var i = 0; i < inputLength - 1; i++) {
            if (this.pattern[i] !== this.userPattern[i]) return 2
        }
        if (inputLength === patLength) return 1
        return 0
        // status returns one of:
        //   - 0 user has not made a mistake yet
        //   - 1 user has finished the pattern for this turn
        //   - 2 user has made a mistake
    };

}

var buttons = Array.prototype.slice.call(document.querySelectorAll('.button'));

buttons.forEach(function (element) {
    element.addEventListener('click', function () {
        console.log(this.getAttribute('value'))
    })
})
