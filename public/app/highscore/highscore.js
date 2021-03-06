wordWar.highscore = function (viewManager) {
  'use strict';

  function setHighscore(users) {
    /*jshint validthis:true */
    var usersArray = convertUsersToArray(users);

    var $highscoreList = viewManager.element('#highscore-list');

    viewManager.clearHtml($highscoreList);

    for (var i = 0; i < usersArray.length; i++) {
      var highscoreItem = usersArray[i];
      highscoreItem.index = i + 1;
      highscoreItem.host = this.avatarHost;

      if (highscoreItem.name === this.username) {
        highscoreItem.current = true;
      }

      viewManager.appendHtml($highscoreList, 'highscore-list-item-tpl', highscoreItem);
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

  var highscore = {
    username: '',
    avatarHost: ''
  };

  Object.defineProperty(highscore, 'users', {
    set: setHighscore,
    configurable: true
  });

  return highscore;
};