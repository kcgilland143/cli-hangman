window.onload = function() {
  var guess = document.getElementById('guess')
  var guesses = document.getElementById('guesses')
  var correctGuesses = document.getElementById('board')
  var numWrong = document.getElementById('state')
  var stateCanvas = document.getElementsByTagName('canvas')[0]
  var wins = document.getElementById('wins')
  var losses = document.getElementById('losses')
  hangmanGame = new Game( 
    document.getElementById('hangman'),
    guess, correctGuesses, guesses, stateCanvas,
    numWrong, wins, losses 
    )
  hangmanGame.target.focus()
  hangmanGame.start()
  // setInterval( function () {
  //   hangmanGame.handleInput('abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random()*26)])
  // }, 500)
}

var game = {
  words: ['programming', 'function', 'variable', 'conditional', 'operator', 'javascript', 'HTML', 'CSS', 'development', 'front-end', 'back-end', 'full stack', 'encapsulation', 'inheritance', 'prototype', 'document', 'window', 'node', 'database', 'console', 'inspector'],
  target: document.body,
  guess: '',
  guesses: [],
  correctGuesses: [],
  numWrongGuesses: 0,
  wins: 0,
  losses: 0,

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
    if (!n) { ++this.numWrongGuesses.value }
  },

  applyGuess: function() {
    if (this.guess.value) { 
      if (!this.guesses.value.includes(this.guess.value)) {
        this.guesses.val.unshift(this.guess.value)
        this.guesses.value = this.guesses.val
        this.checkGuess()
        // this.guess.value = ''
      } else return 0 //alert('no')
    }
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

  checkNewGame: function () { //promptNewGame
    var gO = this.gameOver()
    if (gO) { 
      var cond = (gO > 1 ? 'You Won!' : 'You Lost!')
      setTimeout( function () {
        var playAgain = confirm(cond + ' Game over, try again?')
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

function Game( targetElem, guessElem,
  correctGuessesElem, guessesElem, stateCanvas, 
  numWrongGuessesElem, winsElem, lossesElem) {
  Object.setPrototypeOf(this, game)
  this.target = targetElem || document.body
  this.guess = new RenderedVar ( this.target, guessElem )
  this.correctGuesses = new RenderedVar ( this.target, correctGuessesElem )
  this.correctGuesses.delimiter = ' '
  this.guesses = new RenderedVar ( this.target, guessesElem )
  this.stateCanvas = new Canvas( stateCanvas )
  this.numWrongGuesses = new RenderedVar ( this.target, numWrongGuessesElem )
  this.numWrongGuesses.represent = function () {
    this.stateCanvas.drawState(this.numWrongGuesses.val)
    return this.numWrongGuesses.val
  }.bind(this)
  this.wins = new RenderedVar( this.target, winsElem )
  this.losses = new RenderedVar( this.target, lossesElem )
  // this.start()
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
    if (this.val.constructor === Array) { //array
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

// ***-----****
// ***|**-.-***
// ***|***|****
// **___*|*|***
// ************

function Canvas( target ) {
  this.target = target
  this.context = this.target.getContext('2d')
  this.drawState = function drawState (state) {
    var ctx=this.context
    var w = this.target.clientWidth
    var winc = w / 12
    var h = this.target.clientHeight
    var hinc = h / 12
    switch (state) {
      case 0:
        ctx.closePath()
        ctx.clearRect(0,0,w,h)
        ctx.beginPath()
        break;
      case 1: //base
        ctx.moveTo(winc*2, hinc*12)
        ctx.lineTo(winc*4, hinc*12)
        break;
      case 2: //vertical
        ctx.moveTo(winc*3, hinc*12)
        ctx.lineTo(winc*3, hinc*2)
        break;
      case 3: //horizontal support
        ctx.lineTo(winc*6, hinc*2)
        break;
      case 4: //head
        ctx.closePath()
        ctx.beginPath()
        ctx.arc(winc*6, hinc*4, hinc*1, 0, Math.PI*2)
        break;
      case 5: //body
        ctx.moveTo(winc*6, hinc*5)
        ctx.lineTo(winc*6,hinc*8)
        break;
      case 6: //right leg
        ctx.lineTo(winc*5,hinc*10)
        break;
      case 7: //left leg
        ctx.moveTo(winc*6, hinc*8)
        ctx.lineTo(winc*7,hinc*10)
        break;
      case 8: //right arm
        ctx.moveTo(winc*6, hinc*5)
        ctx.lineTo(winc*5,hinc*6)
        break;
      case 9: //left arm
        ctx.moveTo(winc*6, hinc*5)
        ctx.lineTo(winc*7,hinc*6)
        break;
      case 10: //connector
        ctx.moveTo(winc*6, hinc*3)
        ctx.lineTo(winc*6,hinc*2)
        break;
    }
    ctx.stroke()
  }
}