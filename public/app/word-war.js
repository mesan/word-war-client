var wordWar = (function () {
  return {
    run: function () {

      // Initialize modules.
      wordWar.login = wordWar.login(wordWar.viewManager, wordWar.inputManager);
      wordWar.letterGrid = wordWar.letterGrid(wordWar.viewManager, wordWar.inputManager);
      wordWar.highscore = wordWar.highscore(wordWar.viewManager);
      wordWar.remainingTime = wordWar.remainingTime(wordWar.viewManager);
      wordWar.console = wordWar.console(wordWar.viewManager);
      wordWar.eventListener = wordWar.eventListener(wordWar);

      wordWar.viewManager.initialize('app', 'highscore');

      wordWar.users = {};
    }
  };
})();