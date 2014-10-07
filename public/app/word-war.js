var wordWar = (function () {

  return {
    run: function () {
      wordWar.viewManager.initialize('app', 'highscore');

      wordWar.users = {};

      var socket;

      wordWar.letterGrid.onWordEntered(function (event) {
        socket.emit('newWord', event.target.value);
        event.target.value = '';
      });

      wordWar.login.onUsernameEntered(function (event) {
        var socketUrl = wordWar.socketUrlResolver.resolve();

        socket = wordWar.socketConnector.connect(socketUrl);

        wordWar.eventListener.listen(socket);

        wordWar.username = wordWar.highscore.username = event.target.value;
        wordWar.highscore.host = socketUrl;

        socket.emit('login', wordWar.username);

        wordWar.login.$loggedIn = true;
      });
    }
  };
})();