var wordWar = (function () {

  return {
    run: function () {
      wordWar.viewManager.initialize('app', 'highscore');

      wordWar.users = {};

      var socket;

      wordWar.inputManager.onEnterPressed('word-input', function (event) {
        socket.emit('newWord', event.target.value);
        event.target.value = '';
      });

      wordWar.inputManager.onEnterPressed('user-login', function (event) {
        var socketUrl = wordWar.socketUrlResolver.resolve();

        socket = wordWar.socketConnector.connect(socketUrl);

        wordWar.eventListener.listen(socket);

        wordWar.username = wordWar.highscore.username = event.target.value;

        socket.emit('login', wordWar.username);

        wordWar.$loggedIn = true;
      });

      function setLoggedIn(loggedIn) {
        if (loggedIn) {
          wordWar.viewManager.insertHtml(wordWar.viewManager.element('#main'), 'logged-in-tpl');
        }
      }

      Object.defineProperty(wordWar, '$loggedIn', {
        set: setLoggedIn,
        configurable: true
      });
    }
  };
})();