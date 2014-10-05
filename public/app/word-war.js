var wordWar = (function () {

  var socketUrl = 'http://word-war-mesan.herokuapp.com:80';
  //var socketUrl = 'http://localhost:5000';

  var currentUsers = {};

  return {
    run: function () {

      var $remainingTimeContainer;
      var $consoleContainer = wordWar.layoutManager.$('#app-console');
      var $mainContainer = wordWar.layoutManager.$('#main');
      var socket;

      // Listeners

      function initializeListeners() {
        socket.on('connected', function (welcome) {
          console.log('connected', welcome);
        });

        socket.on('userLoggedIn', function (user) {
          console.log('state', user);
          socket.emit('state', null);
        });

        socket.on('currentState', function (state) {
          console.log('currentState', state);
          currentUsers = state.users;
          updateLetters(state.letters);
          updateHighscore(convertUsersToArray(currentUsers));
        });

        socket.on('scoreUpdate', function (user) {
          console.log('scoreUpdate', user);
          currentUsers[user.name] = user;
          user.updated = true;

          updateHighscore(convertUsersToArray(currentUsers));
        });

        socket.on('newRound', function (letters) {
          console.log('newRound', letters);
          updateLetters(letters);
        });

        socket.on('remainingTime', function (secondsRemaining) {
          console.log('remainingTime', secondsRemaining);
          var remainingTimeHtml =
            wordWar.layoutManager.template('remaining-time-tpl', {
              secondsRemaining: secondsRemaining,
              danger: secondsRemaining <= 5
            });
          $remainingTimeContainer.html(remainingTimeHtml);
        });

        socket.on('wordTaken', function (wordObj) {
          console.log('wordTaken', wordObj);

          var context = {
            user: wordObj.user,
            tag: 'nytt ord',
            message: wordObj.word + ' (' + wordObj.wordScore + 'p)'
          };

          var consoleEntryHtml =
            wordWar.layoutManager.template('console-entry-tpl', context);

          $consoleContainer.html(consoleEntryHtml);
        });
      }

      wordWar.layoutManager.manageLayout('app', 'highscore');

      wordWar.layoutManager.$('html').on('keypress', '#word-input', function (event) {
        if (event.which === 13) {
          suggestWord(event.target.value);
          event.target.value = '';
        }
      });

      wordWar.layoutManager.$('html').on('keypress', '#user-login', function (event) {
        if (event.which === 13) {
          socket = wordWar.socketConnector.connect(socketUrl);
          socket.emit('login', event.target.value);
          setUpMainView();
          initializeListeners();
        }
      });

      function setUpMainView() {
        var mainHtml = wordWar.layoutManager.template('main-tpl');
        $mainContainer.html(mainHtml);
        $remainingTimeContainer = wordWar.layoutManager.$('#remaining-time');
      }

      function suggestWord(word) {
        socket.emit('newWord', word);
      }

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

      function updateLetters(lettersLowerCase) {
        var letters = lettersLowerCase.map(function (letter) {
          return letter.toUpperCase();
        });

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

      function convertUsersToArray(usersObj) {
        var usersArray = [];

        var userNames = Object.keys(usersObj);

        for (var i = 0; i < userNames.length; i++) {
          usersArray.push(usersObj[userNames[i]]);
        }

        usersArray.sort(function (a, b) {
          console.log('test');
          return b.score - a.score;
        });

        return usersArray;
      }
    }
  };
})();