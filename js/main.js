var game = {
    power: false,
    score: 0,
    pattern: [],
    input: [],
    valid: true
}

var buttons = Array.prototype.slice.call(document.querySelectorAll('.button'));

buttons.forEach(function (element) {
    element.addEventListener('click', function () {
        console.log(this.getAttribute('value'))
    })
})
