wordWar.login = (function (wordWar) {
  var login = {};

  function setLoggedIn(loggedIn) {
    if (loggedIn) {
      wordWar.viewManager.insertHtml(
        wordWar.viewManager.element('#main'),
        'logged-in-tpl');
    }
  }

  Object.defineProperty(login, '$loggedIn', {
    set: setLoggedIn,
    configurable: true
  });

  return login;
})(wordWar);