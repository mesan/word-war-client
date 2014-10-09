wordWar.letterGrid = function (viewManager, inputManager) {
  'use strict';

  function setLetters(letters) {
    var $wordGrid = viewManager.element('#letter-grid');

    var lettersUpperCase = letters.map(function (letter) {
      return letter.toUpperCase();
    });

    $wordGrid.empty();

    var $row;

    for (var i = 0; i < lettersUpperCase.length; i++) {
      if (i % 6 === 0) {
        $row = viewManager.element('<tr/>');
        $wordGrid.append($row);
      }

      viewManager.appendHtml($row, 'word-grid-cell-tpl', lettersUpperCase[i]);
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