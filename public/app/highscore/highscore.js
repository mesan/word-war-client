wordWar.highscore = (function (wordWar) {
  'use strict';

  function setHighscore(users) {
    var usersArray = convertUsersToArray(users);

    var $highscoreList = wordWar.viewManager.element('#highscore-list');

    $highscoreList.empty();

    for (var i = 0; i < usersArray.length; i++) {
      var highscoreItem = usersArray[i];
      highscoreItem.index = i + 1;
      highscoreItem.host = this.host;

      if (highscoreItem.name === wordWar.highscore.username) {
        highscoreItem.current = true;
      }

      wordWar.viewManager.appendHtml($highscoreList, 'highscore-list-item-tpl', highscoreItem);
    }
  }

  function convertUsersToArray(usersObj) {
    var usersArray = [];

    var userNames = Object.keys(usersObj);

    for (var i = 0; i < userNames.length; i++) {
      usersArray.push(usersObj[userNames[i]]);
    }

    usersArray.sort(function (a, b) {
      return b.score - a.score;
    });

    return usersArray;
  }

  var highscore = {};

  highscore.username = '';

  Object.defineProperty(highscore, '$users', {
    set: setHighscore,
    configurable: true
  });

  return highscore;
})(wordWar);