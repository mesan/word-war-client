wordWar.letterGrid = (function (wordWar) {
  'use strict';

  function setLetters(letters) {
    var $wordGrid = wordWar.viewManager.element('#letter-grid');

    var lettersUpperCase = letters.map(function (letter) {
      return letter.toUpperCase();
    });

    $wordGrid.empty();

    var $row;

    for (var i = 0; i < lettersUpperCase.length; i++) {
      if (i % 6 === 0) {
        $row = wordWar.viewManager.element('<tr/>');
        $wordGrid.append($row);
      }

      wordWar.viewManager.appendHtml($row, 'word-grid-cell-tpl', lettersUpperCase[i]);
    }
  }

  var letterGrid = {};

  Object.defineProperty(letterGrid, '$letters', {
    set: setLetters
  });

  return letterGrid;
})(wordWar);