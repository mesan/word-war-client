wordWar.login = function (viewManager, inputManager) {
  function setLoggedIn(loggedIn) {
    if (loggedIn) {
      viewManager.insertHtml(
        viewManager.element('#main'),
        'logged-in-tpl');
    }
  }

  function onUsernameEntered(handler) {
    inputManager.onEnterPressed('user-login', function (event) {
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
};