wordWar.letterGrid = (function (wordWar) {

  function updateLetters(state) {
    var $wordGrid = wordWar.layoutManager.$('#word-grid');

    var letters = state.letters.map(function (letter) {
      return letter.toUpperCase();
    });

    $wordGrid.empty();

    var $row;

    for (var i = 0; i < letters.length; i++) {
      if (i % 6 === 0) {
        $row = wordWar.layoutManager.$('<tr/>');
        $wordGrid.append($row);
      }

      var $letterCell = wordWar.layoutManager.template(
        'word-grid-cell-tpl', letters[i]
      );

      $row.append($letterCell);
    }
  }

  return {
    updateLetters: updateLetters
  };
})(wordWar);