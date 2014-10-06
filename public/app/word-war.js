var wordWar = (function () {

  var currentUsers = {};

  return {
    run: function () {
      var socketUrl;
      var host = wordWar.queryParser.getArgument('host');

      if (host === 'local') {
        socketUrl = 'http://localhost:5000';
      } else {
        socketUrl = 'http://word-war-mesan.herokuapp.com:80';
      }

      var $mainContainer = wordWar.layoutManager.$('#main');
      var socket;
      var username;

      wordWar.layoutManager.manageLayout('app', 'highscore');

      wordWar.inputManager.onEnterPressed('word-input', function (event) {
        socket.emit('newWord', event.target.value);
        event.target.value = '';
      });

      wordWar.inputManager.onEnterPressed('user-login', function (event) {
        socket = wordWar.socketConnector.connect(socketUrl);

        username = event.target.value;

        wordWar.highscore.username = username;

        socket.emit('login', username);

        wordWar.layoutManager.insertHtml($mainContainer, 'main-tpl');

        initializeListeners();
      });

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
          wordWar.letterGrid.$letters = state.letters;
          wordWar.highscore.$users = state.users;
        });

        socket.on('scoreUpdate', function (user) {
          console.log('scoreUpdate', user);
          currentUsers[user.name] = user;
          user.updated = true;
          wordWar.highscore.$users = currentUsers;
          user.updated = false;
        });

        socket.on('newRound', function (letters) {
          console.log('newRound', letters);
          wordWar.letterGrid.$letters = letters;
        });

        socket.on('remainingTime', function (secondsRemaining) {
          wordWar.remainingTime.$secondsRemaining = secondsRemaining;
        });

        socket.on('wordOk', function (wordObj) {
          console.log('wordOk', wordObj);

          var consoleEntry = {
            user: wordObj.user.name,
            type: 'success',
            tag: 'nytt ord',
            message: wordObj.word + ' (' + wordObj.wordScore + 'p)'
          };

          wordWar.console.newEntry(consoleEntry);
        });

        socket.on('wordInvalid', function (word) {
          var consoleEntry = {
            user: username,
            type: 'warning',
            tag: 'ugyldig ord',
            message: word + ' (-1p)'
          };

          wordWar.console.newEntry(consoleEntry);
        });

        socket.on('wordTaken', function (word) {
          var consoleEntry = {
            user: username,
            type: 'warning',
            tag: 'ord tatt',
            message: word + ' (-1p)'
          };

          wordWar.console.newEntry(consoleEntry);
        });
      }
    }
  };
})();