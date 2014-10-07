wordWar.login = (function (wordWar) {
  function setLoggedIn(loggedIn) {
    if (loggedIn) {
      wordWar.viewManager.insertHtml(
        wordWar.viewManager.element('#main'),
        'logged-in-tpl');
    }
  }

  function onUsernameEntered(handler) {
    wordWar.inputManager.onEnterPressed('user-login', function (event) {
      handler(event);
    });
  }

  var login = {
    onUsernameEntered: onUsernameEntered
  };

  Object.defineProperty(login, '$loggedIn', {
    set: setLoggedIn,
    configurable: true
  });

  return login;
})(wordWar);