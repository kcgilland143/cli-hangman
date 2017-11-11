var inquirer = require('inquirer')
var game = require('./game.js')

console.log(game)

function GuessWord () {
  inquirer.prompt([
    {
      type: "input",
      message: "Guess a Letter: ",
      validate: function (answer) {
        console.log(answer)
        if (typeof answer === 'string' && answer.length === 1) { return true }
      },
      name: "guess"
    }
  ]).then(function (inquireData) {
    // take guess, apply guess, show guess status, 
    // if game is not over show this prompt again, else ask to play again
    game.word = new game.SecretWord('hi there'.split(' '))
    console.log('here')
    game.word.guess(inquireData.guess)
    console.log(game.word.encodedWord)
  }, function (reason) {
    console.log(reason)
  })
}