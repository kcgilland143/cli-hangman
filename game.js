var game = {
  words: ['programming', 'function', 'variable', 'conditional', 'operator', 'javascript', 'HTML', 'CSS', 'development', 'front-end', 'back-end', 'full stack', 'encapsulation', 'inheritance', 'prototype', 'document', 'window', 'node', 'database'],
  target: document.body,
  guess: '',
  guesses: [],
  correctGuesses: [],
  numWrongGuesses: 0,

  start: function()  {
    this.word = 'hi there'
    this.guess.value = 'do you want to play a game?'
    this.initialize()
    this.target.addEventListener('keyup', this.handleInput.bind(this))
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
        } else if (input.which === 13 && this.guess.value) {
          this.applyGuess()
        }
      }
    }
    this.checkNewGame()
  },

  checkGuess: function() {
    var n = 0
    var tempArr = []
    for (var i = 0; i < this.word.length; ++i) {
      if (this.guess.value[0].toLowerCase() === this.word[i].toLowerCase()) {
        tempArr = this.correctGuesses.val
        tempArr[i] = this.word[i]
        this.correctGuesses.value = tempArr
        ++n
      }
    }
    if (!n) { ++this.numWrongGuesses.value}
  },

  applyGuess: function() {
    if (this.guess.value) { 
      if (!this.guesses.value.includes(this.guess.value)) {
        this.guesses.val.push(this.guess.value)
        this.guesses.value = this.guesses.val
        this.checkGuess()
        this.guess.value = ''
      } else return 0 //alert('no')
    }
  },

  gameOver: function() {
    var gO = 0
    if (this.numWrongGuesses.value >= 9) {
      return 1
    } else if (!this.correctGuesses.val.includes('_')) {
      return 2
    }
  },

  checkNewGame: function () {
    var gO = this.gameOver()
    if (gO) { 
      var cond = (gO > 1 ? 'You Won!' : 'You Lost!')
      setTimeout( function () {
        var playAgain = true //confirm(cond + ' Game over, try again?')
        if (playAgain) { this.initialize() } 
      }.bind(this), 1)
    }
  },


  awardFreeCharacters: function () {
    for (var i = 0; i < this.word.length; ++i) {
      switch (this.word[i]) {
        case ' ': 
          this.correctGuesses.val[i] = '&nbsp;';
          break;
        case ',': 
          this.correctGuesses.val[i] = ',';
          break;
        case "'": 
          this.correctGuesses.val[i] = "'";
          break;
        case '-':
          this.correctGuesses.val[i] = '-';
          break;
      }
    }
    this.correctGuesses.value = this.correctGuesses.val
  },

  initialize: function() {
    this.word = this.words[Math.floor(Math.random()*this.words.length)]
    this.guess.value = ''
    this.guesses.value = []
    this.correctGuesses.value = Array(this.word.length).fill('_')
    this.numWrongGuesses.value = 0
    this.awardFreeCharacters()
  }
}

function Game( targetElem, guessElem, correctGuessesElem, guessesElem, numWrongGuessesElem) {
  Object.setPrototypeOf(this, game)
  this.target = targetElem || document.body
  this.guess = new RenderedVar ( this.target, guessElem )
  this.guesses = new RenderedVar ( this.target, guessesElem )
  this.correctGuesses = new RenderedVar ( this.target, correctGuessesElem )
  this.correctGuesses.delimiter = ' '
  this.numWrongGuesses = new RenderedVar ( this.target, numWrongGuessesElem )
  this.start()
}

var renderedVar = {
  val: '',
  parentElement: document.body,
  target: document.createElement('div'),
  delimiter: ', ',

  get value() {
    return this.val
  },

  set value (value) {
    this.val = value
    this.render()
  },

  represent: function representValue() {
    if (typeof this.val === 'object') { //array
      return this.val.join(this.delimiter)
    }
    return this.val
  },

  render: function render () {
    if (!this.target.parentElement) {
      this.parentElement.appendChild(this.target)
    }
    this.target.innerHTML = this.represent()
  }
}

function RenderedVar(parent, target) {
  Object.setPrototypeOf(this, renderedVar)
  this.parentElement = parent || document.body
  this.target = target || document.createElement('div')
  this.render()
}


window.onload = function() {
  var guess = document.getElementById('guess')
  var guesses = document.getElementById('guesses')
  var correctGuesses = document.getElementById('board')
  var numWrong = document.getElementById('state')
  hangman = new Game( 
    document.getElementById('hangman'),
    guess, correctGuesses, guesses, numWrong 
    )
  hangman.target.focus()
  setInterval( function () {
    hangman.handleInput('abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random()*26)])
  }, 500)
}

