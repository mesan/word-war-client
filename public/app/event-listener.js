wordWar.eventListener = function (wordWar) {

  var socket;

  wordWar.letterGrid.onWordEntered(function (event) {
    // TODO Emit word to server?
  });

  wordWar.login.onUsernameEntered(function (event) {
    var socketUrl = wordWar.socketUrlResolver.resolve();
    socket = wordWar.socketConnector.connect(socketUrl);

    // TODO Emit login to server?

    listenOnSocketEvents();
  });

  function listenOnSocketEvents() {
    socket.on('connected', function (welcome) {
      // TODO
    });

    socket.on('userLoggedIn', function (user) {
      // TODO
    });

    socket.on('userLoggedOut', function (user) {
      // TODO
    });

    socket.on('currentState', function (state) {
      // TODO
    });

    socket.on('scoreUpdate', function (user) {
      // TODO
    });

    socket.on('newRound', function (letters) {
      // TODO
    });

    socket.on('remainingTime', function (secondsRemaining) {
      // TODO
    });

    socket.on('wordOk', function (wordObj) {
      // TODO
    });

    socket.on('wordInvalid', function (word) {
      // TODO
    });

    socket.on('wordTaken', function (word) {
      // TODO
    });

    socket.on('sorry', function (errorMessage) {
      // TODO
    });
  }
};