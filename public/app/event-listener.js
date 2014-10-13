wordWar.eventListener = function (
  wordWar,
  socketUrlResolver,
  socketConnector,
  inputManager,
  login,
  letterGrid,
  highscore,
  remainingTime,
  console) {

  var socket;

  login.onUsernameEntered(function (inputElement) {
    var socketUrl = socketUrlResolver.resolve();

    highscore.avatarHost = socketUrl;

    socket = socketConnector.connect(socketUrl);

    listenOnSocketEvents();

    wordWar.username = highscore.username = inputElement.value;

    socket.emit('login', wordWar.username);

    login.loggedIn = true;

    letterGrid.onWordEntered(function (inputElement) {
      socket.emit('newWord', inputElement.value);
      inputElement.value = '';
    });
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
      letterGrid.letters = state.letters;
      highscore.users = state.users;
    });

    socket.on('scoreUpdate', function (user) {
      wordWar.users[user.name] = user;
      user.updated = true;
      highscore.users = wordWar.users;
      user.updated = false;
    });

    socket.on('newRound', function (letters) {
      letterGrid.letters = letters;
    });

    socket.on('remainingTime', function (secondsRemaining) {
      remainingTime.secondsRemaining = secondsRemaining;
    });

    socket.on('wordOk', function (wordObj) {
      var consoleEntry = {
        user: wordObj.user.name,
        type: 'success',
        tag: 'nytt ord',
        message: wordObj.word + ' (' + wordObj.wordScore + 'p)'
      };

      console.addEntry(consoleEntry);
    });

    socket.on('wordInvalid', function (word) {
      var consoleEntry = {
        user: wordWar.username,
        type: 'warning',
        tag: 'ugyldig ord',
        message: word + ' (-1p)'
      };

      console.addEntry(consoleEntry);
    });

    socket.on('wordTaken', function (word) {
      var consoleEntry = {
        user: wordWar.username,
        type: 'warning',
        tag: 'ord tatt',
        message: word + ' (-1p)'
      };

      console.addEntry(consoleEntry);
    });

    socket.on('sorry', function (errorMessage) {
      console.log(errorMessage);
    });
  }
};