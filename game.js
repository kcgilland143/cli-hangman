
var secretWord = {
  word: [],//''
  encodedWord: [],
  guess: '',
  guesses: {
    correct:[],
    incorrect:[]
  },


  encodeWord: function encodeSecretWord() {
    for (var o = 0; o < this.word.length; o++) {
      var piece = this.word[o]
      this.encodedWord[o] = []
      for (var i = 0; i < piece.length; i++)
      switch (piece[i]) {
        case ',': 
          this.encodedWord[o][i] = ',';
          break;
        case "'": 
          this.encodedWord[o][i] = "'";
          break;
        case '-':
          this.encodedWord[o][i] = '-';
          break;
        default:
          this.encodedWord[o][i] = '_';
          break;
      }
    }
  },

  guess: function (char) {
    char = char.toLowerCase()
    //check for repeat guess
    this.guesses['all'] = this.guesses['correct'].concat(this.guesses['incorrect'])
    var repeat = (this.guesses['all'].indexOf(char) !== -1)
    if (!repeat) {
      this.guesses['all'].push(char)
      let correct = this.applyGuess(char) !== 0
      if (correct) {
        this.guesses['correct'].push(char)
        return true
      } else {
        this.guesses['incorrect'].push(char)
        return false
      }
    } else return 'Repeat Guess...try something else'
  },
  
  applyGuess: function (char) { //Apply guess to secret word, update to game board
    var n = 0
    var tempArr = []
    var o, i = [0, 0]
    for (o = 0; o < this.word.length; o++) {
      var piece = this.word[o]
      console.log(piece)
      for (i = 0; i < piece.length; i++)
        if (char.toLowerCase() === this.word[o][i].toLowerCase()) {
          this.encodedWord[o][i] = this.word[o][i]
          ++n
        }
    }
    return n
  },
}

function SecretWord(wordsArr) {
  Object.setPrototypeOf(this, secretWord)
  this.word = wordsArr
  this.encodeWord()
  console.log(this.encodedWord)
}

var game = {
  //words: ['programming', 'function', 'variable', 'conditional', 'operator', 'javascript', 'HTML', 'CSS', 'development', 'front-end', 'back-end', 'full stack', 'encapsulation', 'inheritance', 'prototype', 'document', 'window', 'node', 'database', 'console', 'inspector'],
  //words: ['runescape', 'destiny', 'halo wars', 'rocket league', 'call of duty', 'world of warcraft', 'super smash bros.' ],
  words: ['Armorines: Project S.W.A.R.M', 'GoldenEye 007', 'The Legend of Zelda: Ocarina of Time', 'Gauntlet Legends', 'BattleTanx: Global Assault', "A Bug's Life", 'Super Smash Bros', 'Pokemon Snap', 'Pokemon Staduim', 'Rugrats: Scavenger Hunt', 'Rush', 'Army Men: Air Combat', "Army Men: Sarge's Heroes", 'Star Fox', 'Tony Hawks Pro Skater', 'WWF Attitude',' Hot Wheels Turbo Racing', 'Harvest Moon', 'WWF No Mercy', 'Mortal Kombat', 'Mario Kart', 'LEGO Racers'],
  category: '',
  wins: 0,
  losses: 0,
  word: [],
  SecretWord: SecretWord,

  start: function()  {
    //prompt initial game
    this.initialize()
  },

  checkNewGame: function () { //promptNewGame
    var gO = this.gameOver()
    if (gO) { 
      var cond = (gO > 1 ? 'You Won!' : 'You Lost!')
      setTimeout( function () {
        var playAgain = confirm(cond + ' Game over, try again?')
        if (playAgain) { this.initialize() } 
      }.bind(this), 10)
    }
  },

  initialize: function() {
    this.word = this.words[Math.floor(Math.random()*this.words.length)]
    this.awardFreeCharacters()
  },

  handleInput: function (input) {
    var type = typeof input
    if (type === 'string') {
      this.guess.value = input[0]
      this.applyGuess()
    } else
    if (type === 'object' && input.keyCode) {
      if (input.target === this.target) {
        if (input.which >= 65 && input.which <= 90) {
          this.guess.value = input.key
       // } else if (input.which === 13 && this.guess.value) {
          this.applyGuess()
        }
      }
    }
    this.checkNewGame()
  },

  gameOver: function() {
    var gO = 0
    if (this.numWrongGuesses.value >= 10) {
      ++this.losses.value
      return 1
    } else if (!this.correctGuesses.val.includes('_')) {
      ++this.wins.value
      return 2
    }
  },
}

module.exports = game
