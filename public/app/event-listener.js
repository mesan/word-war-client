wordWar.eventListener = function (wordWar) {

  var socket;

  wordWar.letterGrid.onWordEntered(function (inputElement) {
    socket.emit('newWord', inputElement.value);
    inputElement.value = '';
  });

  wordWar.login.onUsernameEntered(function (inputElement) {
    var socketUrl = wordWar.socketUrlResolver.resolve();

    wordWar.highscore.avatarHost = socketUrl;

    socket = wordWar.socketConnector.connect(socketUrl);

    listenOnSocketEvents();

    wordWar.username = wordWar.highscore.username = inputElement.value;

    socket.emit('login', wordWar.username);

    wordWar.login.loggedIn = true;
  });

  function listenOnSocketEvents() {
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
      wordWar.letterGrid.letters = state.letters;
      wordWar.highscore.users = state.users;
    });

    socket.on('scoreUpdate', function (user) {
      wordWar.users[user.name] = user;
      user.updated = true;
      wordWar.highscore.users = wordWar.users;
      user.updated = false;
    });

    socket.on('newRound', function (letters) {
      wordWar.letterGrid.letters = letters;
    });

    socket.on('remainingTime', function (secondsRemaining) {
      wordWar.remainingTime.secondsRemaining = secondsRemaining;
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

    socket.on('sorry', function (errorMessage) {

    });
  }
};