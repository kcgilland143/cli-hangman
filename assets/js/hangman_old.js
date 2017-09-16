
var currentWord = "programming";
var guess = '';
var guesses = [];
var wrongGuesses = 0;
var playArea = '';


window.onload = function () {
  playArea = touchElement.call( document.body, "play-area");
  console.log(document)
  createEmptySpacesFor.call( playArea, currentWord );
  touchElement.call( playArea, 'wrongGuesses', '0', 'p');

  document.onkeyup = function (event) {
    handleKeyboardInput(event);
  }
}

//changes guess if key is alphabet character,
//checks guess against previous guesses before passing to checkGuess
function handleKeyboardInput (keyEvent) {
  if (keyEvent.which >= 65 && keyEvent.which <= 90) {
    guess = keyEvent.key;
    touchElement.call( playArea, "guess", guess, "h1" );
  } else if (keyEvent.which === 18 && guess) {
    if (!guesses.includes(guess)) {
      checkGuess(guess) 
    } else alert("You've already guessed " + guess);
  }
}

function checkGuess ( charGuessed ) {
  guesses.push(charGuessed);
  touchElement.call(playArea, "guesses", guesses.join(', '), 'p');
  var matches = getIndicesOfChar( charGuessed, currentWord );
  if (matches.length) {
    for ( var m=0; m < matches.length; m++ ) {
      touchElement(( 'letter' + matches[m] ), charGuessed)
    }
  } else {
    wrongGuesses++;
    touchElement('wrongGuesses', parseInt(wrongGuesses));
  }
}

//creates '_ '  * wordlength in html 
function createEmptySpacesFor (word) {
  for (var i=0; i < word.length; i++) {
    var el = touchElement.call(this, 'letter' + i, '_', 'span');
    // this.appendChild(el);
    this.appendChild(document.createTextNode(' '));
  }
}

//return array of the indexes where char appears in word
function getIndicesOfChar (char, word) {
  var res = [];
  for (var c = 0; c < word.length; c++) {
    if (word[c] === char) {
      res.push(c);
    }
  }
  return res
}

// Helper function to create or reference new html element
function touchElement (id, content, tag) {
    var tag = tag || '';
    var content = content || '';
    var el = document.getElementById(id)
    if (!el) { 
      tag = tag || 'div';
      el = document.createElement(tag);
      el.setAttribute('id', id);
      this.appendChild(el);
    }
    if (content) { el.innerHTML = content; }
    return el;
}