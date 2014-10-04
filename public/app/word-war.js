var wordWar = (function () {

  //var socketUrl = 'http://word-war-mesan.herokuapp.com:80';
  var socketUrl = 'http://localhost:5000';

  return {
    run: function () {
      wordWar.layoutManager.manageLayout('app', 'highscore');

      var socket = wordWar.socketConnector.connect(socketUrl);

      // Listeners

      socket.on('connected', function () {
        socket.emit('login', 'anjao');
      });

      socket.on('userLoggedIn', function (user) {
        console.log(user);

        socket.emit('state', null);
      });

      socket.on('currentState', function (state) {
        updateLetters(state.letters);
        updateHighscore(state.users);
      });

      function updateHighscore(users) {
        var $highscoreList = wordWar.layoutManager.$('#highscore-list');

        $highscoreList.empty();

        var userIds = Object.keys(users);

        for (var i = 0; i < userIds.length; i++) {
          var userId = userIds[i];
          var user = users[userId];
          user.index = i + 1;

          var $highscoreListItem =
            wordWar.layoutManager.template('highscore-list-item-tpl', user);

          $highscoreList.append($highscoreListItem);
        }
      }

      function updateLetters(letters) {
        var $wordGrid = wordWar.layoutManager.$('#word-grid');

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
    }
  };
})();