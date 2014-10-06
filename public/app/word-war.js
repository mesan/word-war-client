var wordWar = (function () {

  //var socketUrl = 'http://word-war-mesan.herokuapp.com:80';
  var socketUrl = 'http://localhost:5000';

  var currentUsers = {};

  return {
    run: function () {

      var $remainingTimeContainer;
      var $mainContainer = wordWar.layoutManager.$('#main');
      var socket;
      var username;

      // Listeners

      function initializeListeners() {
        socket.on('connected', function (welcome) {
          console.log('connected', welcome);
        });

        socket.on('userLoggedIn', function (user) {
          socket.emit('state', null);
        });

        socket.on('userLoggedOut', function (user) {
          socket.emit('state', null);
        });

        socket.on('currentState', function (state) {
          currentUsers = state.users;
          wordWar.letterGrid.updateLetters(state);
          wordWar.highscore.updateHighscore(state);
        });

        socket.on('scoreUpdate', function (user) {
          console.log('scoreUpdate', user);

          currentUsers[user.name] = user;
          user.updated = true;

          wordWar.highscore.updateHighscore({ users: currentUsers });
        });

        socket.on('newRound', function (letters) {
          console.log('newRound', letters);
          wordWar.letterGrid.updateLetters({ letters: letters });
        });

        socket.on('remainingTime', function (secondsRemaining) {
          var remainingTimeHtml =
            wordWar.layoutManager.template('remaining-time-tpl', {
              secondsRemaining: secondsRemaining,
              danger: secondsRemaining <= 5
            });
          $remainingTimeContainer.html(remainingTimeHtml);
        });

        socket.on('wordOk', function (wordObj) {
          console.log('wordOk', wordObj);

          var context = {
            user: wordObj.user.name,
            tag: 'nytt ord',
            message: wordObj.word + ' (' + wordObj.wordScore + 'p)',
            type: 'success'
          };

          wordWar.console.newEntry(context);
        });

        socket.on('wordInvalid', function (word) {
          var context = {
            user: username,
            tag: 'ugyldig ord',
            message: word + ' (-1p)',
            type: 'warning'
          };

          wordWar.console.newEntry(context);
        });

        socket.on('wordTaken', function (word) {
          var context = {
            user: username,
            tag: 'ord tatt',
            message: word + ' (-1p)',
            type: 'warning'
          };

          wordWar.console.newEntry(context);
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

          username = event.target.value;
          wordWar.highscore.username = username;

          socket.emit('login', username);

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
    }
  };
})();