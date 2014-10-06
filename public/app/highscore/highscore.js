wordWar.highscore = (function (wordWar) {

  function updateHighscore(state) {
    var users = convertUsersToArray(state.users);

    var $highscoreList = wordWar.layoutManager.$('#highscore-list');

    $highscoreList.empty();

    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      user.index = i + 1;

      if (user.name === wordWar.highscore.username) {
        user.current = true;
      }

      var $highscoreListItem =
        wordWar.layoutManager.template('highscore-list-item-tpl', user);

      $highscoreList.append($highscoreListItem);
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

  return {
    username: '',
    updateHighscore: updateHighscore
  };
})(wordWar);