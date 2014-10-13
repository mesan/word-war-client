var wordWar = function (window) {
  return {
    run: function () {

      wordWar.users = {};

      // Initialize modules.
      var viewManager = wordWar.viewManager(window);
      var socketUrlResolver = wordWar.socketUrlResolver(window);
      var socketConnector = wordWar.socketConnector();
      var inputManager = wordWar.inputManager(viewManager);
      var login = wordWar.login(viewManager, inputManager);
      var letterGrid = wordWar.letterGrid(viewManager, inputManager);
      var highscore = wordWar.highscore(viewManager);
      var remainingTime = wordWar.remainingTime(viewManager);
      var console = wordWar.console(viewManager);

      wordWar.eventListener(
        wordWar,
        socketUrlResolver,
        socketConnector,
        inputManager,
        login,
        letterGrid,
        highscore,
        remainingTime,
        console);
    }
  };
};