wordWar.eventListener = (function (wordWar) {

  // Listeners

  function listen(socket) {
    socket.on('connected', function (welcome) {
    });

    socket.on('userLoggedIn', function (user) {
      socket.emit('state', null);
    });

    socket.on('userLoggedOut', function (user) {
      socket.emit('state', null);
    });

    socket.on('currentState', function (state) {
      wordWar.users = state.users;
      wordWar.letterGrid.$letters = state.letters;
      wordWar.highscore.$users = state.users;
    });

    socket.on('scoreUpdate', function (user) {
      wordWar.users[user.name] = user;
      user.updated = true;
      wordWar.highscore.$users = wordWar.users;
      user.updated = false;
    });

    socket.on('newRound', function (letters) {
      wordWar.letterGrid.$letters = letters;
    });

    socket.on('remainingTime', function (secondsRemaining) {
      wordWar.remainingTime.$secondsRemaining = secondsRemaining;
    });

    socket.on('wordOk', function (wordObj) {
      var consoleEntry = {
        user: wordObj.user.name,
        type: 'success',
        tag: 'nytt ord',
        message: wordObj.word + ' (' + wordObj.wordScore + 'p)'
      };

      wordWar.console.addEntry(consoleEntry);
    });

    socket.on('wordInvalid', function (word) {
      var consoleEntry = {
        user: wordWar.username,
        type: 'warning',
        tag: 'ugyldig ord',
        message: word + ' (-1p)'
      };

      wordWar.console.addEntry(consoleEntry);
    });

    socket.on('wordTaken', function (word) {
      var consoleEntry = {
        user: wordWar.username,
        type: 'warning',
        tag: 'ord tatt',
        message: word + ' (-1p)'
      };

      wordWar.console.addEntry(consoleEntry);
    });
  }

  return {
    listen: listen
  };
})(wordWar);