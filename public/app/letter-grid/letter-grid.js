wordWar.letterGrid = function (viewManager, inputManager) {
  'use strict';

  function setLetters(letters) {
    var $wordGrid = viewManager.element('#letter-grid');

    var lettersUpperCase = letters.map(function (letter) {
      return letter.toUpperCase();
    });

    viewManager.clearHtml($wordGrid);

    for (var i = 0; i < lettersUpperCase.length; i+=6) {
      var lettersRow = lettersUpperCase.splice(i, 6);
      viewManager.appendHtml($wordGrid, 'word-grid-row-tpl', { letters: lettersRow });
    }
  }

  function onWordEntered(handler) {
    inputManager.onEnterPressed('word-input', function (event) {
      handler(event.target);
    });
  }

  var letterGrid = {
    onWordEntered: onWordEntered
  };

  Object.defineProperty(letterGrid, 'letters', {
    set: setLetters,
    configurable: true
  });

  return letterGrid;
};